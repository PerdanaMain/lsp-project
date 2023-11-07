"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import axios from "axios";
import Swal from "sweetalert2";

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

const Approve = ({ transaction }: { transaction: Transactions }) => {
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
      const res = await axios({
        method: "PUT",
        url: `/transactions/${transaction.transaction_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status_id: 3,
        },
        baseURL: "http://localhost:3000/api",
        responseType: "json",
      });

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
      console.log(error);
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
      <button className="btn btn-success mb-5" onClick={handleModal}>
        <i className="fa fa-check"></i>
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-large">
              Are you sure to approve this transaction ID :{" "}
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
                  "Approve"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Approve;
