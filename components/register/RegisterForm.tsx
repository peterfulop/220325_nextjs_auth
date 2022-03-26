import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setPasswordConfirm] = useState<string>("");

  const router = useRouter();

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:3002/api/v1/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    });

    console.log(res);

    await router.push("/login");
  };

  return (
    <form className="form-signin" onSubmit={submitForm}>
      <h1 className="h3 mb-3 fw-normal">sign up</h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingName"
          placeholder="Your Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="floatingName">Name</label>
      </div>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingEmail">Email address</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPasswordConfirm"
          placeholder="Password Confirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <label htmlFor="floatingPasswordConfirm">Password Confirm</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
