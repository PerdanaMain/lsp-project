"use client";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

import Login from "./Login";
import Register from "./Register";
import Swal from "sweetalert2";
import axios from "axios";

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: number;
}

const Navbar = () => {
  const cookies = useCookies();
  const router = useRouter();
  const token = cookies.get("access");

  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (token) {
      setIsLogin(true);

      const decoded = jwt.decode(token) as JwtPayload;
      if (decoded != null) {
        setName(decoded.name);
      }
    } else {
      setIsLogin(false);
    }
  }, [token]);

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // delete client cookie
        cookies.remove("access");

        // delete server cookie
        const res = await axios.delete("/api/auth");

        if (res.status === 200) {
          router.refresh();
          router.push("/");
        }

        Swal.fire("Logged Out!", "You have been logged out.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "You are still logged in :)", "error");
      }
    });
  };

  return (
    <div>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              Medical Store App
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
            ></button>
          </div>
          <div
            className="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none hidden"
            id="example-collapse-navbar"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/medkits"
                >
                  Medkits
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/#features"
                >
                  Features
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/#teams"
                >
                  Teams
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/#about"
                >
                  About
                </a>
              </li>
              {isLogin == true ? (
                <li className="flex items-center">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 m-1"
                      style={{
                        transition: "all .15s ease",
                        backgroundColor: "#babbb8",
                        padding: "13px 13px 13px 13px",
                      }}
                    >
                      Welcome, {name}
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-5"
                    >
                      <li>
                        <a href="/transactions">
                          <i className="fa fa-right-to-bracket"></i>
                          Transactions
                        </a>
                      </li>
                      <li>
                        <a role="button" onClick={handleLogout}>
                          <i className="fa fa-right-to-bracket"></i>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li className="flex items-center">
                  <Login />
                  <Register />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
