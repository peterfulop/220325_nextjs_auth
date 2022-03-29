import NewFoodForm from "../components/foods/NewFoodForm";
import { getSession } from "next-auth/react";
import { Fragment } from "react";

const NewMeetup = () => {
  return (
    <Fragment>
      <NewFoodForm />
    </Fragment>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default NewMeetup;
