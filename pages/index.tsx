import type { NextPage, NextPageContext } from "next";
import { Fragment } from "react";
import Layout from "../components/layouts/Layout";
import MeetupList from "../components/foods/FoodList";
import Router from "next/router";
import myGet from "../utils/myGet";

const Home: NextPage = (props: any) => {
  return (
    <>
      <Layout>{/* <MeetupList foods={props.foods} /> */}</Layout>
    </>
  );
};

// Home.getInitialProps = async (ctx: NextPageContext) => {
//   const json = await myGet("http://localhost:3000/api/foods", ctx);
//   return {
//     foods: json.data,
//   };
// };

export default Home;
