import React from "react";
import FoodDetail from "../../components/foods/FoodDetail";
import {
  FoodEntryCreateOptions,
  FoodEntryDetails,
} from "../../server/resources/food/food.interface";
import { getSession } from "next-auth/react";
import Fraction from "fraction.js";

const FoodDetails: any = (props: {
  foodData: FoodEntryCreateOptions;
  details: FoodEntryDetails[];
}) => {
  return (
    <FoodDetail
      name={props.foodData.name}
      details={props.details}
      id={props.foodData._id}
    />
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const foodId = await context.params.id;

  const res = await fetch(`http://localhost:3000/api/foods/${foodId}`);
  if (res.status !== 200) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const data = await res.json();
  const details = getDetails(data.data.details);

  return {
    props: {
      session,
      foodData: data.data,
      details: details,
    },
  };
}

const getDetails = (details: any) => {
  return Object.keys(details).map((key) => {
    var original = new Fraction(details[key]["amount"]);
    var amount = original.toFraction(false);
    return {
      [key]: {
        unit: details[key]["unit"],
        amount,
      },
    };
  });
};

export default FoodDetails;
