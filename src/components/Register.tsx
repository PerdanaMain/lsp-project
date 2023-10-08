"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const cookies = useCookies();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsloading(true);

    // input validation
    if (name === "") {
      Swal.fire("Error", "Name is required", "error");
      setIsloading(false);
      return;
    }
    if (email === "") {
      Swal.fire("Error", "Email is required", "error");
      setIsloading(false);
      return;
    } else {
      if (!email.includes("@")) {
        Swal.fire("Error", "Email type is invalid", "error");
        setIsloading(false);
        return;
      }
    }
    if (password === "") {
      Swal.fire("Error", "Password is required", "error");
      setIsloading(false);
      return;
    }
    if (phone === "") {
      Swal.fire("Error", "Phone number is required", "error");
      setIsloading(false);
      return;
    } else {
      // phone must be number
      if (isNaN(Number(phone))) {
        Swal.fire("Error", "Phone number must be number", "error");
        setIsloading(false);
        return;
      } else {
        if (phone.length < 10) {
          Swal.fire(
            "Error",
            "Phone number must be at least 10 characters",
            "error"
          );
          setIsloading(false);
          return;
        }
      }
    }

    try {
      // send request
      const res = await axios.post("/api/auth/registration", {
        user_name: name,
        user_email: email,
        password,
        user_phone: phone,
        user_address: address,
        RoleId: 2,
      });
      if (res.status === 201) {
        setIsloading(false);

        //set cookie
        cookies.set("access", res.data.data.token);

        Swal.fire("Success", "Registration success", "success").then(() => {
          handleModal();
          router.refresh();
          router.push("/");
        });
      }
    } catch (error: any) {
      setIsloading(false);
      console.log(error);
      return Swal.fire("Error", error.response.data.message, "error");
    }
  };
  return (
    <div>
      <button
        className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
        type="button"
        style={{
          transition: "all .15s ease",
          backgroundColor: "#4ade80",
        }}
        onClick={handleModal}
      >
        <i className="fas fa-arrow-alt-circle-down"></i> Register
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-large text-center mb-3">
            Registration Form
          </h3>
          <form onSubmit={handleRegister}>
            <div>
              <label className="label">
                <span className="text-base label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full input input-bordered input-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div>
              <label className="label">
                <span className="text-base label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Phone Number"
                className="w-full input input-bordered input-primary"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Address</span>
              </label>
              <textarea
                placeholder="Enter Your Address"
                className="textarea w-full input input-bordered input-primary"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                cols={30}
                rows={30}
              ></textarea>
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
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
