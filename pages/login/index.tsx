import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import AuthForm from "../../components/auth/AuthForm";

const Login = () => {
  const [isLoading, setIsloading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsloading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading....</p>;
  }
  return <AuthForm />;
};

export default Login;
