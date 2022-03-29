import { UserUpdateOptions } from "../../server/resources/user/user.interface";
import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";
import Card from "../ui/Card";

function UserProfile(props: { user: any }): JSX.Element {
  async function UpdateMeHandler(updatedData: UserUpdateOptions) {
    // const response = await fetch("/api/users/update-me", {
    //   method: "PATCH",
    //   body: JSON.stringify(updatedData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await response.json();
    // console.log(data);
  }

  return (
    <section className={classes.profile}>
      <Card>
        <h2>Your User Profile</h2>
        <ProfileForm onUpdateMe={UpdateMeHandler} user={props.user} />
      </Card>
    </section>
  );
}

export default UserProfile;
