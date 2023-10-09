import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Products } from "@prisma/client";

const prisma = new PrismaClient();

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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

    // get request
    const { product_name, product_price, product_stock, categoryId }: Products =
      await req.json();

    // update product
    const update = await prisma.products.update({
      where: {
        product_id: Number(params.id),
      },
      data: {
        product_name,
        product_price,
        product_stock,
        categoryId,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Product Updated",
        data: {
          update,
        },
      },
      { status: 200 }
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
  req: Request,
  { params }: { params: { id: string } }
) => {
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

    // delete product
    const del = await prisma.products.delete({
      where: {
        product_id: Number(params.id),
      },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Product Deleted",
        data: {
          del,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};
