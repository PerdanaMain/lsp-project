"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import Swal from "sweetalert2";
import axios from "axios";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: number;
}

const Login = () => {
  const router = useRouter();
  const cookies = useCookies();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsloading(true);

    try {
      // validate input
      if (!email || !password) {
        setIsloading(false);

        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields!",
        });
      }

      // email validation
      if (email !== "admin") {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
          setIsloading(false);
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email is not valid!",
          });
        }
      }

      // send request
      const res = await axios.post("/api/auth", {
        email,
        password,
      });

      if (res.status === 201) {
        setIsloading(false);

        //set cookie
        cookies.set("access", res.data.data.token);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login success",
        }).then(() => {
          handleModal();

          const decoded = jwt.decode(res.data.data.token) as JwtPayload;
          if (decoded.role == 1) {
            router.refresh();
            router.push("/admin");
          } else {
            // redirect to home
            router.refresh();
            router.push("/");
          }
        });
      }
    } catch (error: any) {
      setIsloading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <div>
      <button
        className="text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
        type="button"
        style={{
          transition: "all .15s ease",
          backgroundColor: "#1e90ff",
        }}
        onClick={handleModal}
      >
        <i className="fas fa-arrow-alt-circle-down"></i> Login
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleLogin}>
            <h3 className="font-bold text-large text-center mb-3">
              Login Form
            </h3>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email Address"
                className="w-full input input-bordered input-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered input-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <button type="submit" className="btn btn-primary">
                {isLoading ? (
                  <div>
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                    Processing...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
