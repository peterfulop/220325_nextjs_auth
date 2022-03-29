import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { useSession, signOut } from "next-auth/react";

const MainNavigation = () => {
  const { data: session, status } = useSession();

  function logoutHandler() {
    signOut();
  }
  return (
    <>
      <header className={classes.header}>
        <Link href="/">
          <a>
            <div className={classes.logo}>Food Project</div>
          </a>
        </Link>
        <nav>
          <ul>
            {!session && status && (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/add-food">Add food</Link>
              </li>
            )}
            {session && false && (
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            )}
            {session && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
