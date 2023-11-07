"use client";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import Detail from "./detail";
import Reject from "./reject";
import Approve from "./approve";

const Page = () => {
  const cookies = useCookies();
  const token = cookies.get("access") as string;
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
    fetchTransactions();
  });

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/transactions/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data.data.transactions);
    } catch (error: any) {}
  };
  return (
    <div>
      <Sidebar />

      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <Navbar />

        <div className="py-10 px-10">
          <table className="table w-full ">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Product Name</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th className="tag-center">Actions</th>
              </tr>
            </thead>
            {transactions.length !== 0 ? (
              <tbody>
                {transactions.map((transaction: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {
                        transaction.transactionsOnProduct[0].product
                          .product_name
                      }
                    </td>
                    <td>{transaction.users.user_name}</td>
                    <td>{transaction.transaction_total}</td>
                    <td
                      className={
                        transaction.status.status_id === 1
                          ? "text-green-500"
                          : transaction.status.status_id === 2
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.status.status_desc}
                    </td>

                    {transaction.status.status_id === 1 ||
                    transaction.status.status_id === 3 ? (
                      <td className="flex">
                        <Detail transaction={transaction} />
                      </td>
                    ) : (
                      <td className="flex">
                        <Detail transaction={transaction} />
                        <Approve transaction={transaction} />
                        <Reject transaction={transaction} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <span className="loading loading-spinner loading-xs mr-2"></span>
                Loading...
              </tbody>
            )}
          </table>
        </div>
      </main>
    </div>
  );
};

export default Page;
