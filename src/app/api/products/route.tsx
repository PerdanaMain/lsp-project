import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { includes } from "lodash";

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: number;
}

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

export const GET = (req: NextRequest) => {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.json(
      { status: 401, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const decode = jwt.decode(token.value);

  return NextResponse.json(
    {
      status: 200,
      message: "Success",
      data: {
        token,
        decode,
        pathname,
        isAdmin: isAdminRoute(pathname),
      },
    },
    { status: 200 }
  );
};
