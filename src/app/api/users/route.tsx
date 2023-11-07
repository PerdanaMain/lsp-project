import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Users } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    // get token from cookie
    const token = req.headers.get("authorization") || "";

    if (!token) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // request
    const {
      user_name,
      user_email,
      password,
      user_phone,
      user_address,
      roleId,
    }: Users = await req.json();

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
        roleId,
      },
      select: {
        user_id: true,
        user_name: true,
        user_phone: true,
        user_address: true,
        user_email: true,
        roleId: true,
      },
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Success Create user",
        data: { user },
      },
      { status: 201 }
    );
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
