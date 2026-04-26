import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(data);
      toast.success(data.message || "User logged in Successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      // console.log(error.response.data.errors);
      console.log(error.response);
      toast.error(error.response.data.errors || "User logged in failed");
    }
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-5">Login</h2>
          <form action="" onSubmit={handleRegister}>
            {/*Email field*/}
            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="">
                Email
              </label>

              <input
                className="w-full p-3 border border-gray-300 rounded outline-none focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500"
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/*Password field*/}
            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="">
                Password
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded outline-none focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 p-3 text-white border rounded-xl font-semibold hover:bg-blue-900"
            >
              Login
            </button>
            <p className="mt-4 text-center text-gray-600">
              New user ?
              <Link className="text-blue-600 hover:underline" to="/signup">
                Sigup
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
