import React, { useState } from "react";
import axios from "@services/axios"; // Use your axios instance
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading icon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("user/register", data);
      console.log("User registered:", response.data);
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/sign-in"); // Redirect to login page
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Registration error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-purple-50 px-4">
      <form
        className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Create an Account
        </h2>
         
        <div className="mb-5">
          <label>First Name</label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              {...register("firstName", { required: "First Name is required" })}
              type="text"
              className={`grow ${errors.firstName ? "border-red-500" : ""}`}
              placeholder="John"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>
          {errors.firstName && (
            <p className="text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label>Last Name</label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              className={`grow ${errors.lastName ? "border-red-500" : ""}`}
              placeholder="Doe"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>
          {errors.lastName && (
            <p className="text-red-500 mt-1">{errors.lastName.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label>Email Address</label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              type="text"
              className={`grow ${errors.email ? "border-red-500" : ""}`}
              placeholder="example@domain.com"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
          </label>
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label>Password</label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`grow ${errors.password ? "border-red-500" : ""}`}
              placeholder="••••••••"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          ) : (
            "Create Account"
          )}
        </button>
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-purple-700 underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
