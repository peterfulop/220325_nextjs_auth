import { getSession } from "next-auth/react";
import Head from "next/head";
import { Fragment } from "react";
import FoodList from "../components/foods/FoodList";

const Home = (props: any): JSX.Element => {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <FoodList foods={props.foods} />
    </Fragment>
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
  const response = await fetch("http://localhost:3000/api/foods");
  const foods = await response.json();
  return {
    props: { session, foods: foods.data },
  };
}
export default Home;
