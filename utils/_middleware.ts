import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export default function middleware(req: NextRequest) {
  const { cookies } = req;
  const token = cookies.jwt;
  const url = req.url;

  console.log("itt", url);

  if (url.includes("/login")) {
    if (token) {
      try {
        verify(token, secret as string);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect("http://localhost:3000/login");
      }
    }
  }

  if (url.includes("/foods")) {
    if (token === undefined) {
      return NextResponse.redirect("http://localhost:3000/login");
    }

    try {
      verify(token, secret as string);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect("http://localhost:3000/login");
    }
  }
  return NextResponse.next();
}
