"use client";
import { FormEvent, useState } from "react";
type Transactions = {
  transaction_id: number;
  transaction_at: string;
  transaction_end_date: string;
  transaction_slip: string;
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

import Swal from "sweetalert2";

const Detail = ({ transaction }: { transaction: Transactions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

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
      <button className="btn btn-info mb-5 mr-2" onClick={handleModal}>
        <i className="fa fa-info"></i>
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box w-11/12 max-w-5xl px-4 py-6">
          <form onSubmit={handleSubmit}>
            {/* component */}
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  {transaction.transaction_slip === "" ? (
                    <p className="leading-relaxed">
                      No Slip Transaction Uploaded by{" "}
                      {transaction.users.user_name}
                    </p>
                  ) : (
                    <img
                      alt="ecommerce"
                      className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                      src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
                    />
                  )}

                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2
                      className={
                        transaction.status.status_id === 1
                          ? "text-sm title-font text-green-500 tracking-widest"
                          : transaction.status.status_id === 2
                          ? "text-sm title-font text-yellow-500 tracking-widest"
                          : "text-sm title-font text-red-500 tracking-widest"
                      }
                    >
                      {transaction.status.status_desc}
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-5">
                      Transaction ID : {transaction.transaction_id}
                    </h1>

                    <p className="leading-relaxed">
                      Transaction create at :
                      <span className="bold">{transaction.transaction_at}</span>
                    </p>
                    <p className="leading-relaxed">
                      Transaction paid before :
                      <span className="bold">
                        {transaction.transaction_end_date}
                      </span>
                    </p>

                    <div className="flex">
                      <p className="leading-relaxed">
                        Tax :
                        <span className="title-font font-medium text-2xl text-black-300 mx-auto">
                          Rp.{" "}
                          {transaction.transaction_shipping.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div className="flex">
                      <p className="leading-relaxed">
                        Total :
                        <span className="title-font font-medium text-2xl text-black-900 mx-auto">
                          Rp. {transaction.transaction_total.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="modal-action mt-5">
              <button
                type="button"
                className="btn mr-2 w-auto"
                onClick={handleModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Detail;
