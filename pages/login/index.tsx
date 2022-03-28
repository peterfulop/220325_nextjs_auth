import Layout from "../../components/layouts/Layout";
import LoginForm from "../../components/login/LoginForm";
import { useCookies } from "react-cookie";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <LoginForm />
      </Layout>
    </>
  );
};

export default Login;
