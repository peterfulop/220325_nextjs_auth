import Head from "next/head";
import { Fragment } from "react";
import Layout from "../components/layouts/Layout";

const PageNotFound = () => {
  return (
    <Fragment>
      <section className="not-found">
        <h1>404, Page not found! :( </h1>
      </section>
    </Fragment>
  );
};

export default PageNotFound;
