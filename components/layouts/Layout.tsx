import MainNavigation from "../navigation/MainNavigation";
import classes from "./Layout.module.css";
import { Fragment, ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
