import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Layout from "../components/layouts/Layout";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>
      <Layout>HELLO</Layout>
    </Fragment>
  );
};

export default Home;
