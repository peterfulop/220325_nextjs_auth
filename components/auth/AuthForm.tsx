import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/router";

import { signIn } from "next-auth/react";
import classes from "./AuthForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorToast = (message: string) => toast.error(message);
const successToast = (message: string) => toast.success(message);

async function createUser(
  username: string,
  email: string,
  password: string,
  passwordConfirm: string
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password, passwordConfirm }),
    headers: {
      "Content-Type": "Application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.error) {
      errorToast(Array(data.error).join());
    } else {
      throw new Error(data.message || "Something went wrong!");
    }
  }
  return data;
}

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value as string;
    const enteredUsername = usernameInputRef.current?.value as string;
    const enteredPassword = passwordInputRef.current?.value as string;
    const enteredPasswordConfirm = passwordConfirmInputRef.current
      ?.value as string;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        id: "",
      });

      if (!result) {
        errorToast(Object(result).error);
        return;
      }

      if (Object(result).error) {
        const errorMessage = Object(result).error;
        errorToast(errorMessage);
        return;
      }
      router.replace("/");
    } else {
      try {
        const result = await createUser(
          enteredUsername,
          enteredEmail,
          enteredPassword,
          enteredPasswordConfirm
        );
        if (result.message) {
          successToast(Array(result.message).join());
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="text">Your Name</label>
            <input type="text" id="text" ref={usernameInputRef} required />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Your Password Confirmation</label>
            <input
              type="password"
              id="password"
              ref={passwordConfirmInputRef}
              required
            />
          </div>
        )}
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
        <ToastContainer />
      </form>
    </section>
  );
}

export default AuthForm;
