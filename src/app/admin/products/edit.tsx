"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import axios from "axios";
import Swal from "sweetalert2";
import type { Categories, Products } from "@prisma/client";

const Edit = ({
  categories,
  product,
}: {
  categories: Categories[];
  product: Products;
}) => {
  const cookies = useCookies();
  const token = cookies.get("access");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [title, setTitle] = useState(product.product_name);
  const [price, setPrice] = useState(product.product_price.toString());
  const [stock, setStock] = useState(product.product_stock.toString());
  const [categorie, setCategorie] = useState(product.categoryId.toString());

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    // price validation
    const priceRegex = /^[0-9]+$/;
    if (!priceRegex.test(price)) {
      setIsloading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Price must be a number!",
      });
    }

    // stock validation
    const stockRegex = /^[0-9]+$/;
    if (!stockRegex.test(stock)) {
      setIsloading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Stock must be a number!",
      });
    }

    try {
      const res = await axios.put(
        `/api/products/${product.product_id}`,
        {
          product_name: title,
          product_price: Number(price),
          product_stock: Number(stock),
          categoryId: Number(categorie),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        handleModal();

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Edit Product Successfully",
        }).then(() => {
          handleModal();
          router.refresh();
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
      <button className="btn btn-warning mb-5" onClick={handleModal}>
        <i className="fa fa-edit"></i>
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-large">Edit Product</h3>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Product Price</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Product Stock</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Product Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                className="select select-bordered"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              >
                <option value="" disabled hidden>
                  ==== Select a Category ====
                </option>
                {categories.map((categorie, index) => (
                  <option key={index} value={categorie.category_id}>
                    {categorie.category_name}
                  </option>
                ))}
              </select>
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
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
