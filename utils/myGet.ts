import Router from "next/router";
import { NextPageContext } from "next/types";

export default async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers.cookie;

  const res = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  if (res.status === 401 && !ctx.req) {
    Router.replace("/login");
  }
  if (res.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "http://localhost:3000/login",
    });
    ctx.res?.end();
  }

  const json = await res.json();

  return {
    data: json.data,
  };
}
