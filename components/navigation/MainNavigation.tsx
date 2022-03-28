import classes from "./MainNavigation.module.css";
import Link from "next/link";
import Router from "next/router";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Foods</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/foods/new-food">Add new Food</Link>
          </li>
          <li>
            <Link href="/api/auth/logout">
              <a>LogOut</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
