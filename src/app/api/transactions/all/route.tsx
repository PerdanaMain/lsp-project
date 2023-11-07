import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    const transactions = await prisma.transactions.findMany({
      orderBy: {
        transaction_id: "desc",
      },
      include: {
        transactionsOnProduct: {
          select: {
            product: {
              select: {
                product_name: true,
                product_price: true,
                product_image: true,
              },
            },
          },
        },
        status: {
          select: {
            status_id: true,
            status_desc: true,
          },
        },
        users: {
          select: {
            user_name: true,
            user_email: true,
            user_phone: true,
            user_address: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Success get transactions",
        data: {
          transactions,
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
