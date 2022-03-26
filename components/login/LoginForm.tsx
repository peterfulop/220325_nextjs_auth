import { NextRouter, useRouter } from "next/router";
import { useState, SyntheticEvent } from "react";
import AlertColors from "../../utils/alertColors.enum";
import AlertMessage from "../../utils/alertMessage.type";
import AlertBox from "../AlertBox";

const LoginForm = () => {
  const router: NextRouter = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isThereAlert, setIsThereAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>();

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

    console.log(res);

    // const data = await res.json();
    // console.log(data);

    // setIsThereAlert(true);

    // let message: string;

    // console.log(data.message);

    // if (data.message) {
    //   message = data.message;
    // } else {
    //   console.log("itt", data);
    //   message = Array(data.error).join("-");
    // }

    // const alert: AlertMessage = {
    //   title: data.status,
    //   color: AlertColors.danger,
    //   message: message,
    // };

    // setAlertMessage(alert);
    // console.log(alertMessage);
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
      {isThereAlert && <AlertBox details={alertMessage} />}
    </form>
  );
};

export default LoginForm;
