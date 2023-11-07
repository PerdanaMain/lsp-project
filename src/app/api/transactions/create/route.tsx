import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: number;
}

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

    // get request body
    const {
      product_id,
      transaction_quantity,
      transaction_total,
      transaction_shipping,
      userId,
      statusId,
    } = await req.json();

    // date end 3 days
    const date = new Date();
    date.setDate(date.getDate() + 3);

    // insert to transaction table
    const transaction = await prisma.transactions.create({
      data: {
        transaction_quantity,
        transaction_total,
        transaction_shipping,
        transaction_end_date: date,
        transaction_slip: "",
        userId,
        statusId,
      },
      select: {
        transaction_id: true,
        transaction_quantity: true,
        transaction_total: true,
        transaction_shipping: true,
        userId: true,
        statusId: true,
      },
    });

    // insert into transactiononproduc detail table
    const transactionOnProduct = await prisma.transactionsOnProducts.create({
      data: {
        transactionId: transaction.transaction_id,
        productId: product_id,
      },
      select: {
        transactionId: true,
        productId: true,
      },
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Success create transaction",
        data: {
          transaction,
          transactionOnProduct,
        },
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
