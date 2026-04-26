import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://fullstack-todo-app-1vr5.onrender.com/user/signup",
        {
          username,
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
      toast.success(data.message || "User registered Successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");

      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.response.data.errors);
      toast.error(error.response.data.errors || "User registration failed");
    }
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-5">Signup</h2>
          <form action="" onSubmit={handleRegister}>
            {/*username field */}
            <div className="mb-4 ">
              <label className="block font-semibold mb-2" htmlFor="">
                Username
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded outline-none focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500"
                type="text"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
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
              Signup
            </button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account ?
              <Link className="text-blue-600 hover:underline" to="/login">
                Login
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
