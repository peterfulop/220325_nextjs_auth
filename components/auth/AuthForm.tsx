import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/router";

import { signIn } from "next-auth/react";
import classes from "./AuthForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

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
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
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
          username as string,
          email as string,
          password as string,
          passwordConfirm as string
        );
        if (result.message) {
          successToast(Array(result.message).join());
          setUsername((prev) => "");
          setEmail((prev) => "");
          setPassword((prev) => "");
          setPasswordConfirm((prev) => "");
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
            <TextField
              className="w-100"
              type="text"
              label="Name"
              variant="outlined"
              required
              id="name"
              value={username}
              onChange={(e) => setUsername((prev) => e.target.value)}
            />
          </div>
        )}
        <div className={classes.control}>
          <TextField
            className="w-100"
            type="email"
            label="Email"
            variant="outlined"
            required
            id="email"
            value={email}
            onChange={(e) => setEmail((prev) => e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <TextField
            className="w-100"
            type="password"
            label="Password"
            variant="outlined"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword((prev) => e.target.value)}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <TextField
              className="w-100"
              type="password"
              label="Password Confirmation"
              variant="outlined"
              required
              id="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm((prev) => e.target.value)}
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
