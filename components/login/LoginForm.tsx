import { NextRouter, useRouter } from "next/router";
import { useState, SyntheticEvent } from "react";

const LoginForm = () => {
  /////////////////////////////////

  const router: NextRouter = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isThereAlert, setIsThereAlert] = useState<boolean>(false);

  const onLogin = async (event: SyntheticEvent): Promise<any> => {
    event?.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();

    if (res.status !== 200) {
      console.log(data.error);
      alert(data.error);
      return;
    }
    router.push("/");
  };

  return (
    <form className="form-signin" onSubmit={onLogin}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => {
            setUsername(e.target.value);
            setIsThereAlert(false);
          }}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setIsThereAlert(false);
          }}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
