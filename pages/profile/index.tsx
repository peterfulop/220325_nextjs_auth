import UserProfile from "../../components/profile/UserProfile";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { Fragment } from "react";

function ProfilePage(props: any) {
  return (
    <Fragment>
      <Head>
        <title>Profile</title>
      </Head>
      <UserProfile user={props.session.user} />
    </Fragment>
  );
}

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

export default ProfilePage;
