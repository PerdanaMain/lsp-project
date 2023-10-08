"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [file, setFile] = useState<File>();
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    if (!file) {
      setIsloading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select image!",
      });
    }
    try {
      const data = new FormData();
      data.set("file", selectedImage);

      // const res = await axios.post("/api/products/upload", data);

      // if (res) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "Success",
      //     text: "Create Product Successfully",
      //   });
      // }

      console.log({ data, file, selectedImage });
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setIsloading(false);
  };
  return (
    <div>
      <button className="btn btn-primary mb-5" onClick={handleModal}>
        Add New
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-large">New Product</h3>
            <div className="form-control w-full">
              <label className="label font-bold">
                <input
                  type="file"
                  name="file"
                  hidden
                  onChange={(e) => {
                    if (e.target.files) {
                      const file = e.target.files?.[0];
                      setSelectedImage(URL.createObjectURL(file));
                      setFile(file);
                    }
                  }}
                />
                <div className="w-40 aspect-video rounded flex items-center justify-center border-2 bordered-dashed cursor-pointer">
                  {selectedImage ? (
                    <div className="avatar">
                      <Image
                        src={selectedImage}
                        alt="Product Image"
                        width={200}
                        height={200}
                      />
                    </div>
                  ) : (
                    <span>Select Image</span>
                  )}
                </div>
              </label>
            </div>
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
                  "Add New"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
