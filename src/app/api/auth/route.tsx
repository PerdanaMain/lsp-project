import { PrismaClient } from "@prisma/client";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Roles } from "@prisma/client";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Head from "next/head";

const prisma = new PrismaClient();

const KEY = "my-secret-sda214x";

// Login route API
export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const user = await prisma.users.findUnique({
      where: {
        user_email: email,
      },
      select: {
        user_id: true,
        user_name: true,
        user_phone: true,
        user_address: true,
        user_email: true,
        password: true,
        roleId: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: 404, message: "User not found" },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { status: 404, message: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.user_email,
        name: user.user_name,
        phone: user.user_phone,
        address: user.user_address,
        role: user.roleId,
      },
      KEY,
      {
        expiresIn: "1h",
      }
    );

    cookies().set("token", token, {
      name: "token",
      value: token,
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
    headers.apply({ authorization: `Bearer ${token}` });

    return NextResponse.json(
      {
        status: 201,
        message: "Login successful",
        data: {
          token,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// Logout route API
export const DELETE = async (req: Request) => {
  try {
    // get token from cookie
    const token: any = cookies().get("token");
    // check if token is exist
    if (token) {
      // delete token from cookie
      cookies().delete("token");

      return NextResponse.json(
        {
          status: 200,
          message: "Logout successful",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
