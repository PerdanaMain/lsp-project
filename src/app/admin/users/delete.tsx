"use client";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import type { Users } from "@prisma/client";
import axios from "axios";
import Swal from "sweetalert2";

const Delete = ({ user }: { user: Users }) => {
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
        `/api/users/${user.user_id}`,

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
          text: "Delete Users Successfully",
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
      <button className="btn btn-error mb-5 ml-2" onClick={handleModal}>
        <i className="fa fa-trash"></i>
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-large">
              Are you sure to delete {user.user_name}?
            </h3>

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
                  "Delete"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Delete;
