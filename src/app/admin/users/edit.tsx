"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import axios from "axios";
import Swal from "sweetalert2";
import type { Roles, Users } from "@prisma/client";

const Edit = ({ roles, user }: { roles: Roles[]; user: Users }) => {
  const cookies = useCookies();
  const token = cookies.get("access");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useState(user.user_name);
  const [phone, setPhone] = useState(user.user_phone);
  const [address, setAddress] = useState(user.user_address);
  const [role, setRole] = useState(user.roleId.toString());
  const [email, setEmail] = useState(user.user_email);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const res = await axios.put(
        "/api/users/" + user.user_id,
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

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Edit Users Successfully",
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
      <button className="btn btn-warning mb-5" onClick={handleModal}>
        <i className="fa fa-edit"></i>
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-large">Edit Product</h3>
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
                placeholder="Product Stock"
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
