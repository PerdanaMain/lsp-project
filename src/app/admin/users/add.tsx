"use client";
import { useState, FormEvent } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

import axios from "axios";
import Swal from "sweetalert2";
import type { Roles } from "@prisma/client";

const Add = ({ roles }: { roles: Roles[] }) => {
  const cookies = useCookies();
  const token = cookies.get("access");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const res = await axios.post(
        "/api/users",
        {
          user_name: name,
          user_phone: phone,
          user_email: email,
          user_address: address,
          roleId: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Add Users Successfully",
        }).then((result) => {
          if (result.isConfirmed) {
            handleModal();
            router.refresh();
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
      <button className="btn btn-primary mb-5" onClick={handleModal}>
        Add New
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-large">New User</h3>
            <div className="form-control w-full">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Phone</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Email</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Adress</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Adress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Role</label>
              <select
                className="select select-bordered"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled hidden>
                  ==== Select a Role ====
                </option>
                {roles.map((roles, index) => (
                  <option key={index} value={roles.role_id}>
                    {roles.role_desc}
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
