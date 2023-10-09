import { NextResponse } from "next/server";
import type { Products } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    // get body from request
    const { product_name, product_price, product_stock, categoryId }: Products =
      await req.json();

    // if product name is exist
    const product = await prisma.products.findUnique({
      where: {
        product_name: product_name,
      },
    });

    if (product) {
      return NextResponse.json(
        { status: 409, message: "Product Name Already Exist" },
        { status: 409 }
      );
    }

    const insert = await prisma.products.create({
      data: {
        product_name,
        product_price,
        product_stock,
        product_image: "",
        categoryId,
      },
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Product Created",
        data: {
          insert,
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
