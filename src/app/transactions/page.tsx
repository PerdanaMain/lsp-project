"use client";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Invoice from "./invoice";

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
      const res = await axios.get("/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data.data.transactions);
    } catch (error: any) {}
  };

  return (
    <div>
      <Navbar />
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1631248055158-edec7a3c072b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1461&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        {transactions ? (
          <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-10 py-10">
                  {/* Products Loop */}
                  <table className="table w-full ">
                    <thead>
                      <tr className="tag-center">
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th className="tag-center">Actions</th>
                      </tr>
                    </thead>
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
                          <td>{transaction.transaction_quantity}</td>
                          <td>{transaction.transaction_total}</td>
                          <td>{transaction.status.status_desc}</td>

                          {transaction.status.status_id === 2 ? (
                            <td className="flex">
                              <Invoice transaction={transaction} />
                              <a
                                role="button"
                                href={`/payments/${transaction.transaction_id}`}
                                className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md text-whitec ml-3"
                              >
                                Pay Now!
                              </a>
                            </td>
                          ) : (
                            <td className="flex">
                              <Invoice transaction={transaction} />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* EndProducts Loop */}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div>
            <span className="loading loading-spinner loading-xs mr-2"></span>
            Loading...
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Page;
