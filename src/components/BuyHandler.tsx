"use client";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import type { Products } from "@prisma/client";
import axios from "axios";
import jwt from "jsonwebtoken";

import Image from "next/image";
import Swal from "sweetalert2";

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: number;
}

const BuyHandler = ({ products }: { products: Products }) => {
  const cookies = useCookies();
  const token = cookies.get("access") as string;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [counter, setCounter] = useState(1);
  const [price, setPrice] = useState(products.product_price);
  const shipping = 5000;
  const total = price * counter + shipping;

  const handleCounter = (type: number) => {
    if (type == 1) {
      setCounter(counter - 1);
    } else {
      setCounter(counter + 1);
    }

    if (counter <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Minimum order is 1!",
      });
      setCounter(1);
    }
  };

  const handleModal = () => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must login first!",
      });
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsloading(true);

    try {
      // decode token
      const decoded = jwt.decode(token) as JwtPayload;

      const res = await axios.post(
        "/api/transactions/create",
        {
          product_id: products.product_id,
          transaction_quantity: counter,
          transaction_total: total,
          transaction_shipping: shipping,
          userId: decoded.id,
          statusId: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 201) {
        setIsloading(false);
        handleModal();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Checkout success!",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(
              `/payments/${res.data.data.transaction.transaction_id}`
            );
          }
        });
      }
    } catch (error: any) {
      setIsloading(false);
      handleModal();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }

    setIsloading(false);
  };
  return (
    <div>
      <button
        className="badge badge-primary px-5 py-5 mb-5"
        onClick={handleModal}
      >
        Buy Now
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <form onSubmit={handleSubmit}>
          <div className="modal-box modal-box w-11/12 max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              <ul className="-my-8">
                <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                  <div className="shrink-0">
                    <Image
                      className="h-24 w-24 max-w-full rounded-lg object-cover"
                      src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="relative flex flex-1 flex-col justify-between">
                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                      <div className="pr-8 sm:pr-5">
                        <p className="text-base font-semibold text-gray-900">
                          {products.product_name}
                        </p>
                        <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                          stocks: {products.product_stock}
                        </p>
                      </div>
                      <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                        <div className="sm:order-1">
                          <div className="mx-auto flex h-8 items-stretch text-gray-600">
                            <button
                              type="button"
                              className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                              onClick={() => handleCounter(1)}
                            >
                              -
                            </button>
                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                              {counter}
                            </div>
                            <button
                              type="button"
                              className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                              onClick={() => handleCounter(2)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Subtotal</p>
                <p className="text-lg font-semibold text-gray-900">
                  Rp. {(price * counter).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Shipping</p>
                <p className="text-lg font-semibold text-gray-900">
                  Rp. {shipping.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 mb-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                <span className="text-xs font-normal text-gray-400">Rp.</span>{" "}
                {total.toLocaleString()}
              </p>
            </div>

            <div className="modal-action mt-10 text-center">
              <button
                type="button"
                className="btn btn-neutral mr-2 w-auto"
                onClick={handleModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary w-auto">
                {isLoading ? (
                  <div>
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                    Processing...
                  </div>
                ) : (
                  "Checkout Now!"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyHandler;
