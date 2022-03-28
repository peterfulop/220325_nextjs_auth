import NewFoodForm from "../../components/foods/NewFoodForm";
import { useRouter } from "next/router";
import MainNavigation from "../../components/navigation/MainNavigation";
import Layout from "../../components/layouts/Layout";
import { FoodEntryCreateOptions } from "../../server/resources/food/food.interface";
import { NextPageContext } from "next/types";
import myGet from "../../utils/myGet";

const NewMeetup = () => {
  const router = useRouter();

  const addFoodHandler = async (
    enteredFoodData: FoodEntryCreateOptions,
    enteredIngredient: string
  ) => {
    let bodyObject = JSON.stringify(enteredFoodData).replace(
      "foodDetailKey",
      enteredIngredient
    );

    const res = await fetch("/api/foods", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: bodyObject,
    });
    const data = await res.json();

    if (res.status !== 201) {
      alert(data.error);
      return;
    }
    router.push("/");
  };

  return (
    <Layout>
      <NewFoodForm onAddFood={addFoodHandler} />
    </Layout>
  );
};

NewMeetup.getInitialProps = async (ctx: NextPageContext) => {
  const json = await myGet("http://localhost:3000/api/foods", ctx);
  return {
    foods: json.data,
  };
};

export default NewMeetup;
