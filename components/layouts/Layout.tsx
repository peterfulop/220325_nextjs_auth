import Head from "next/head";
import { Fragment, ReactNode } from "react";
import Navigation from "../navigation/Navigation";

const Layout = (props: { children: ReactNode }) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
