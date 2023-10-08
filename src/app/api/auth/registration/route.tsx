import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { Users } from "@prisma/client";
import { cookies } from "next/headers";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const KEY = "my-secret-sda214x";

// Register route API
export const POST = async (req: Request) => {
  try {
    const {
      user_name,
      user_email,
      password,
      user_phone,
      user_address,
      RoleId,
    }: Users = await req.json();

    // check if email already exists
    const emailExists = await prisma.users.findUnique({
      where: {
        user_email,
      },
    });
    if (emailExists) {
      return NextResponse.json(
        { status: 400, message: "Email already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await prisma.users.create({
      data: {
        user_name,
        user_email,
        password: hashedPassword,
        user_phone,
        user_address,
        RoleId,
      },
      select: {
        user_id: true,
        user_name: true,
        user_phone: true,
        user_address: true,
        user_email: true,
        Roles: {
          select: {
            role_id: true,
            role_desc: true,
          },
        },
      },
    });

    // create token
    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.user_email,
        name: user.user_name,
        phone: user.user_phone,
        address: user.user_address,
        role: user.Roles.role_id,
        role_desc: user.Roles.role_desc,
      },
      KEY
    );

    // set token in cookie
    cookies().set("token", token, {
      name: "token",
      value: token,
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Register success",
        data: {
          user,
          token,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message, error },
      { status: 500 }
    );
  }
};
