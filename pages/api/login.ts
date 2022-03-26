import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const serverFetch = await fetch("http://127.0.0.1:3002/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await serverFetch.json();
    const token = data.token;
    console.log(data);

    if (token) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
    }

    res.status(data.statusCode).send({ message: data.status });
  }
};

export default handler;
