import Layout from "../../components/layouts/Layout";
import LoginForm from "../../components/login/LoginForm";

const Login = () => {
  const getFoods = async () => {
    const res = await fetch("/api/get-all-foods");
    const data = await res.json();
    console.log(data);
  };
  return (
    <Layout>
      <LoginForm />
      <input
        typeof="button"
        onClick={getFoods}
        type="button"
        value={"GET FOODS"}
      />
    </Layout>
  );
};

export default Login;
