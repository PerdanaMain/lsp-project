import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Users } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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

    // update user
    const user = await prisma.users.update({
      where: {
        user_id: Number(params.id),
      },
      data: {
        user_name,
        user_email,
        password: hashedPassword,
        user_phone,
        user_address,
        roleId,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Success Update user",
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // get token from cookie
    const token = req.headers.get("authorization") || "";

    if (!token) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // update user
    const user = await prisma.users.delete({
      where: {
        user_id: Number(params.id),
      },
    });

    const transactions = await prisma.transactions.findMany({
      where: {
        userId: Number(params.id),
      },
    });

    transactions.map(async (transaction) => {
      await prisma.transactions.delete({
        where: {
          transaction_id: transaction.transaction_id,
        },
      });
      await prisma.transactionsOnProducts.deleteMany({
        where: {
          transactionId: transaction.transaction_id,
        },
      });
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Success Delete user",
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
