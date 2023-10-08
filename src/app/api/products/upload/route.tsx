import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // get bearer token from headers
    const token = req.headers.get("authorization") || "";

    // check if token is valid
    if (!token) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({ status: 200, message: "Hello World" });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
