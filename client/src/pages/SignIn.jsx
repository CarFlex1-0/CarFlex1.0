import React, { useState } from "react";
import axios from "@services/axios"; // Use your axios instance
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading icon
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../contexts/auth_context";
const SignIn = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.post("user/login", data);
      console.log("User (Cookie) signed in:", response.data);

      Cookies.set("token", response.data.token, { expires: 30 }); // Adjust expiration as needed
      Cookies.set("user", JSON.stringify(response.data), { expires: 30 });
      // TODO: AHMAD SE CHECKK KRWANA
      await setUser(response.data);
      console.log("User (Auth) signed in:", user); // Giving Null
      toast.success("Signed in successfully!", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
      navigate("/user/customize-3d-model", { replace: true });


    } catch (error) {
      const errorMessage =
        "Sign In failed. Please check your credentials and try again.";
      setErrorMessage(errorMessage);
      toast.error(errorMessage, {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
      console.error("Sign In error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-950 to-indigo-950 bg-opacity-100 px-4">
      <form
        className="backdrop-blur-md bg-white/10 rounded-lg shadow-lg p-8 max-w-md w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Sign In
        </h2>
        {errorMessage && (
          <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
        )}
        <div className="mb-5">
          <label className="block  text-white mb-2">Email Address</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            className={`bg-gray-200 text-black w-full p-2 border rounded-lg transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@domain.com"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full bg-gray-200 text-black p-2 border rounded-lg transition ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center mb-5 justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="mr-2 checkbox"
              id="rememberMe"
            />
            <label htmlFor="rememberMe" className="text-white">
              Remember Me
            </label>
          </div>
          <Link to="/forgot-password" className="text-purple-700 underline">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full flex items-center justify-center transition duration-200 hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          ) : (
            "Sign In"
          )}
        </button>
        <p className="text-sm text-center text-white mt-6">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-purple-700 underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
