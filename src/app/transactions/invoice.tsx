"use client";
import { useState, FormEvent } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

type Transactions = {
  transaction_id: number;
  transaction_start_date: string;
  transaction_end_date: string;
  transaction_shipping: number;
  transaction_total: number;
  createdAt: string;
  status: {
    status_id: number;
    status_desc: string;
  };
  transactionsOnProduct: [
    {
      product: {
        product_name: string;
        product_price: number;
        product_image: string;
      };
    },
    {
      product: {
        product_name: string;
        product_price: number;
        product_image: string;
      };
    }
  ];
  users: {
    user_name: string;
    user_address: string;
    user_phone: string;
    user_email: string;
  };
};

import axios from "axios";
import Swal from "sweetalert2";

const Invoice = ({ transaction }: { transaction: Transactions }) => {
  const cookies = useCookies();
  const token = cookies.get("access");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  console.log(transaction);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    try {
    } catch (error: any) {
      console.log(error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data.message,
      });
    }
    setIsloading(false);
  };
  return (
    <div>
      <button
        className={
          transaction.status.status_id === 1
            ? "bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md text-white"
            : transaction.status.status_id === 2
            ? "bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded-md text-white"
            : "bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md text-white"
        }
        onClick={handleModal}
      >
        Invoice
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box w-11/12 max-w-5xl px-4 py-6">
          <form onSubmit={handleSubmit}>
            <div className="w-full bg-white lg:w-full print:transform print:scale-90">
              <header
                className={
                  transaction.status.status_id === 1
                    ? "flex flex-col items-center px-8 pt-20 text-lg text-center bg-white border-t-8 border-green-700 md:block lg:block xl:block print:block md:items-start lg:items-start xl:items-start print:items-start md:text-left lg:text-left xl:text-left print:text-left print:pt-8 print:px-2 md:relative lg:relative xl:relative print:relative"
                    : transaction.status.status_id === 2
                    ? "flex flex-col items-center px-8 pt-20 text-lg text-center bg-white border-t-8 border-yellow-700 md:block lg:block xl:block print:block md:items-start lg:items-start xl:items-start print:items-start md:text-left lg:text-left xl:text-left print:text-left print:pt-8 print:px-2 md:relative lg:relative xl:relative print:relative"
                    : "flex flex-col items-center px-8 pt-20 text-lg text-center bg-white border-t-8 border-red-700 md:block lg:block xl:block print:block md:items-start lg:items-start xl:items-start print:items-start md:text-left lg:text-left xl:text-left print:text-left print:pt-8 print:px-2 md:relative lg:relative xl:relative print:relative"
                }
              >
                <div className="flex flex-row mt-12 mb-2 ml-0 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-4xl print:text-2xl lg:ml-12 xl:ml-12">
                  INVOICE
                  <div className="text-green-700">
                    <span className="mr-4 text-sm">■ </span> #
                  </div>
                  <span id="invoice_id" className="text-gray-500">
                    {transaction.transaction_id}
                  </span>
                </div>
                <div className="flex flex-col lg:ml-12 xl:ml-12 print:text-sm">
                  <span>Issue date: {transaction.createdAt}</span>
                  {/* convert createdAt to local date */}

                  <span>Paid date: 2020.09.07</span>
                  <span>Due date: {transaction.transaction_end_date}</span>
                </div>
                {transaction.status.status_id === 1 ? (
                  <div className="px-8 py-2 mt-16 text-3xl font-bold text-green-700 border-4 border-green-700 border-dotted md:absolute md:right-0 md:top-0 md:mr-12 lg:absolute lg:right-0 lg:top-0 xl:absolute xl:right-0 xl:top-0 print:absolute print:right-0 print:top-0 lg:mr-20 xl:mr-20 print:mr-2 print:mt-8">
                    {transaction.status.status_desc}
                  </div>
                ) : transaction.status.status_id === 2 ? (
                  <div className="px-8 py-2 mt-16 text-3xl font-bold text-yellow-700 border-4 border-yellow-700 border-dotted md:absolute md:right-0 md:top-0 md:mr-12 lg:absolute lg:right-0 lg:top-0 xl:absolute xl:right-0 xl:top-0 print:absolute print:right-0 print:top-0 lg:mr-20 xl:mr-20 print:mr-2 print:mt-8">
                    {transaction.status.status_desc}
                  </div>
                ) : (
                  <div className="px-8 py-2 mt-16 text-3xl font-bold text-red-700 border-4 border-red-700 border-dotted md:absolute md:right-0 md:top-0 md:mr-12 lg:absolute lg:right-0 lg:top-0 xl:absolute xl:right-0 xl:top-0 print:absolute print:right-0 print:top-0 lg:mr-20 xl:mr-20 print:mr-2 print:mt-8">
                    {transaction.status.status_desc}
                  </div>
                )}

                <div className="flex flex-col m-12 text-center lg:m-12 md:flex-none md:text-left md:relative md:m-0 md:mt-16 lg:flex-none lg:text-left lg:relative xl:flex-none xl:text-left xl:relative print:flex-none print:text-left print:relative print:m-0 print:mt-6 print:text-sm">
                  <span className="font-extrabold md:hidden lg:hidden xl:hidden print:hidden">
                    FROM
                  </span>
                  <div className="flex flex-col">
                    <span id="company-name" className="font-medium">
                      Medical Store App
                    </span>
                    <span id="company-country">
                      <span className="flag-icon flag-icon-us" /> Indonesia
                    </span>
                    <div className="flex-row">
                      <span id="c-city">Surabaya</span>,
                      <span id="c-postal">SBY 10023</span>
                    </div>
                    <span id="company-address">98-2 W 67th St</span>
                    <span id="company-phone">+12124567777</span>
                    <span id="company-mail">info@medapp.id</span>
                  </div>
                  <span className="mt-12 font-extrabold md:hidden lg:hidden xl:hidden print:hidden">
                    TO
                  </span>
                  <div className="flex flex-col md:absolute md:right-0 md:text-right lg:absolute lg:right-0 lg:text-right print:absolute print:right-0 print:text-right">
                    <span id="person-name" className="font-medium">
                      {transaction.users.user_name}
                    </span>
                    <span id="person-address">
                      {transaction.users.user_address}
                    </span>
                    <span id="person-phone">
                      {transaction.users.user_phone}
                    </span>
                    <span id="person-mail">{transaction.users.user_email}</span>
                  </div>
                </div>
              </header>
              <hr className="border-gray-300 md:mt-8 print:hidden" />
              <div>
                <div
                  id="content"
                  className="flex justify-center md:p-8 lg:p-20 xl:p-20 print:p-2"
                >
                  <table
                    className="w-full text-left table-auto print:text-sm"
                    id="table-items"
                  >
                    <thead>
                      <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black">
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2 text-right">Unit Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transaction.transactionsOnProduct.map((tsp, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border">
                            {tsp.product.product_name}
                          </td>
                          <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                            Rp. {tsp.product.product_price.toLocaleString()}
                          </td>
                        </tr>
                      ))}

                      <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black">
                        <td className="px-4 py-2 text-right border">TAX</td>
                        <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                          Rp.{" "}
                          {transaction.transaction_shipping.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black">
                        <td className="px-4 py-2 font-extrabold text-right border">
                          Total
                        </td>
                        <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                          Rp. {transaction.transaction_total.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="modal-action mt-5">
              <button
                type="button"
                className="btn mr-2 w-auto"
                onClick={handleModal}
              >
                Close
              </button>
              <button className="btn btn-primary" type="submit">
                {isLoading ? (
                  <div>
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                    Processing...
                  </div>
                ) : (
                  "Download Invoice"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
