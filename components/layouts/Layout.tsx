import MainNavigation from "../navigation/MainNavigation";
import classes from "./Layout.module.css";
import { ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
