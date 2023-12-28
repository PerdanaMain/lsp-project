import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: number;
}

const prisma = new PrismaClient();

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

export const GET = async (req: NextRequest) => {
  try {
    // get token from cookie
    const token = req.headers.get("authorization") || "";

    if (!token) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // get all products
    const products = await prisma.products.findMany({
      select: {
        product_id: true,
        product_name: true,
        product_price: true,
        product_stock: true,
        product_image: true,
        categorie: {
          select: {
            category_id: true,
            category_name: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: {
        products,
      },
    });
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
