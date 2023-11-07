"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import axios from "axios";
import Swal from "sweetalert2";
import type { Categories, Products } from "@prisma/client";

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

const Reject = ({ transaction }: { transaction: Transactions }) => {
  const cookies = useCookies();
  const token = cookies.get("access");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const res = await axios.delete(
        `/api/transactions/${transaction.transaction_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `${res.data.message}`,
        }).then((result) => {
          if (result.isConfirmed) {
            router.refresh();
            router.push("/admin/orders");
          }
        });
      }
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
      <button className="btn btn-error ml-2 mb-5" onClick={handleModal}>
        <i className="fa fa-exclamation"></i>
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-large">
              Are you sure to reject this transaction ID :{" "}
              {transaction.transaction_id} ?
            </h3>

            <p>Transaction cant be rollback again</p>

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
                  "Reject"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reject;
