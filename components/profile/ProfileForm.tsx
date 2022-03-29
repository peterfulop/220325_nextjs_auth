import { FormEvent, useEffect, useRef, useState } from "react";
import classes from "./ProfileForm.module.css";

function ProfileForm(props: { onUpdateMe: Function; user: any }): JSX.Element {
  const newUsernameInputRef = useRef<HTMLInputElement>(null);
  const newEmailInputRef = useRef<HTMLInputElement>(null);
  const oldPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmInputRef = useRef<HTMLInputElement>(null);

  const [user] = useState(props.user.name);
  const [username, setUsername] = useState<string>(props.user.name.name);
  const [email, setEmail] = useState<string>(props.user.name.email);

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredUsername = newUsernameInputRef.current?.value as string;
    const enteredEmail = newEmailInputRef.current?.value as string;
    const enteredOldPassword = oldPasswordInputRef.current?.value as string;
    const enteredNewPassword = newPasswordInputRef.current?.value as string;
    const enteredNewPasswordConfirm = newPasswordConfirmInputRef.current
      ?.value as string;

    await props.onUpdateMe({
      email: enteredEmail,
      username: enteredUsername,
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
      newPasswordConfirm: enteredNewPasswordConfirm,
    });
  }

  return (
    <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
      <div className={classes.control}>
        <label htmlFor="new-email">Email</label>
        <input
          type="email"
          id="new-email"
          ref={newEmailInputRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-username">Username</label>
        <input
          type="text"
          id="new-username"
          ref={newUsernameInputRef}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password-confirm">New Password Confirmation</label>
        <input
          type="password"
          id="new-password-confirm"
          ref={newPasswordConfirmInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Save changes</button>
      </div>
    </form>
  );
}

export default ProfileForm;
