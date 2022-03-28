import Head from "next/head";
import Layout from "../components/layouts/Layout";

const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>404 Error</title>
      </Head>
      <Layout>
        <h1>404, Page not found! :( </h1>
      </Layout>
    </>
  );
};

export default PageNotFound;
