import { NextApiResponse, NextPage, NextPageContext } from "next";
import router from "next/router";
import React from "react";
import FoodDetail from "../../components/foods/FoodDetail";
import {
  FoodEntryCreateOptions,
  FoodEntryDetails,
} from "../../server/resources/food/food.interface";
import myGet from "../../utils/myGet";
import Cookies from "cookies";
import Request from "../../utils/interfaces/Request.interface";

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

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/foods/id-list`);
  const data = await res.json();

  return {
    fallback: false,
    paths: data.data.map((id: string) => ({
      params: { id: id },
    })),
  };
}

export async function getStaticProps(context: any) {
  const foodId = await context.params.id;
  const res = await fetch(`http://localhost:3000/api/foods/${foodId}`);
  const data = await res.json();
  console.log(data.data);
  const details = getDetails(data.data.details);
  return {
    props: {
      foodData: data.data,
      details: details,
    },
  };
}

const getDetails = (details: any) => {
  return Object.keys(details).map((key) => {
    return {
      [key]: {
        unit: details[key]["unit"],
        amount: details[key]["amount"],
      },
    };
  });
};

export default FoodDetails;
