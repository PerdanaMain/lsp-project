"use client";
import { useCookies } from "next-client-cookies";
import { useRouter, usePathname } from "next/navigation";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
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
  const token = cookies.get("access");
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState("");

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token) as JwtPayload;
      if (decoded != null) {
        setName(decoded.name);
      }
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
          Swal.fire({
            title: "Logged out!",
            text: "You are logged out!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            // redirect to home and refresh home page
            router.push("/");
            window.location.reload();
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "You are still logged in :)", "error");
      }
    });
  };
  return (
    <div>
      <nav
        className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
        navbar-main=""
        navbar-scroll="true"
      >
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>
            {/* breadcrumb */}
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="text-sm leading-normal">
                <a className="opacity-50 text-slate-700" href="/admin">
                  Admin
                </a>
              </li>
              <li
                className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                aria-current="page"
              >
                {pathname === "/admin"
                  ? "Dashboard"
                  : pathname === "/admin/products"
                  ? "Products"
                  : "Orders"}
              </li>
            </ol>
            <h6 className="mb-0 font-bold capitalize">
              {pathname === "/admin"
                ? "Dashboard"
                : pathname === "/admin/products"
                ? "Products"
                : "Orders"}
            </h6>
          </nav>

          <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <ul className="flex flex-row justify-end pl-0 mb-0 list-none  md:ml-auto md:pr-4">
              <li className="flex items-center">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="block px-0 py-2 text-sm font-semibold transition-all ease-nav-brand text-slate-500"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <i className="fa fa-user sm:mr-5" />
                    Welcome, {name}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-5"
                  >
                    <li>
                      <a role="button" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
