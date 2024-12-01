import React, { useState } from "react";
import axios from "@services/axios"; // Use your axios instance
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading icon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi"; // Add this import for icons
import { useTheme } from "@contexts/ThemeContext";

const SignUp = () => {
  const { isDarkMode, toggleTheme } = useTheme();
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
      // const emailValidity = await axios.post("user/validate-email", {
      //   email: data.email
      // });
      // if(emailValidity.status === 200){
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

         navigate("/sign-in");
      // }else{
      //   toast.success("Email is not valid!", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //   });
      // }
      // Redirect to login page
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
    <div className={`min-h-screen flex justify-center items-center transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#2b4e7e] to-black' 
        : 'bg-gradient-to-br from-blue-100 to-white'
    }`}>
      {/* Theme Toggle Button - Positioned at top-right */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <FiSun className="w-6 h-6 text-white hover:text-yellow-300 transition-colors" />
        ) : (
          <FiMoon className="w-6 h-6 text-gray-800 hover:text-gray-600 transition-colors" />
        )}
      </button>

      <div className={`backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-5xl flex
        ${isDarkMode ? 'bg-white/10' : 'bg-white/80'}`}>
        {/* Left Side - Sign Up Form */}
        <div className="w-1/2 pr-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className={`text-3xl font-bold mb-6 text-center
              ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Create an Account
            </h2>

            <div className="mb-5">
              <label className={`mb-2 block
                ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Account Type
              </label>
              <div className="flex gap-4 justify-center">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    {...register("role")}
                    value="enthusiast"
                    className={`radio ${isDarkMode ? 'radio-primary' : 'radio-info'}`}
                    defaultChecked
                  />
                  <span className={`label-text ml-2
                    ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Enthusiast
                  </span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    {...register("role")}
                    value="seller"
                    className={`radio ${isDarkMode ? 'radio-primary' : 'radio-info'}`}
                  />
                  <span className={`label-text ml-2
                    ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Seller
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="text-red-500 mt-1 text-center">{errors.role.message}</p>
              )}
            </div>

            <div className="mb-5">
              <label className={isDarkMode ? 'text-white' : 'text-gray-700'}>
                First Name
              </label>
              <label className={`input input-bordered flex items-center gap-2
                ${isDarkMode ? 'bg-white/10' : 'bg-white'}`}>
                <input
                  {...register("firstName", { required: "First Name is required" })}
                  type="text"
                  className={`grow ${isDarkMode ? 'text-white' : 'text-gray-800'} 
                    placeholder:text-gray-400 bg-transparent`}
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
              <label className={isDarkMode ? 'text-white' : 'text-gray-700'}>
                Last Name
              </label>
              <label className={`input input-bordered flex items-center gap-2
                ${isDarkMode ? 'bg-white/10' : 'bg-white'}`}>
                <input
                  {...register("lastName", { required: "Last Name is required" })}
                  type="text"
                  className={`grow ${isDarkMode ? 'text-white' : 'text-gray-800'} 
                    placeholder:text-gray-400 bg-transparent`}
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
              <label className={isDarkMode ? 'text-white' : 'text-gray-700'}>
                Email Address
              </label>
              <label className={`input input-bordered flex items-center gap-2
                ${isDarkMode ? 'bg-white/10' : 'bg-white'}`}>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  className={`grow ${isDarkMode ? 'text-white' : 'text-gray-800'} 
                    placeholder:text-gray-400 bg-transparent`}
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
              <label className={isDarkMode ? 'text-white' : 'text-gray-700'}>
                Password
              </label>
              <label className={`input input-bordered flex items-center gap-2
                ${isDarkMode ? 'bg-white/10' : 'bg-white'}`}>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`grow ${isDarkMode ? 'text-white' : 'text-gray-800'} 
                    placeholder:text-gray-400 bg-transparent`}
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
              className="btn btn-primary w-full text-white flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Logo and Welcome Message */}
        <div className={`w-1/2 flex flex-col justify-between items-center 
          border-l ${isDarkMode ? 'border-white/20' : 'border-gray-200'} 
          pl-8 py-4 h-full`}>
          {/* Top section with logo and welcome message */}
          <div className="flex flex-col items-center">
            <div className={`text-5xl font-bold mb-12
              ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Car<span className="text-red-500 animate-pulse">F</span>lex
            </div>
            
            <div className={`text-center mb-12 space-y-4 max-w-md
              ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <p className="text-2xl font-semibold">
                Welcome to CarFlex!
              </p>
              <p className={`text-base ${isDarkMode ? 'opacity-80' : 'text-gray-600'}`}>
                Enter your details and start your journey with us. 
                Your one-stop destination for all car enthusiasts.
              </p>
            </div>

            <div className="w-[400px] h-[250px]">
              <img 
                src="https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070"
                alt="Luxury car"
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Bottom section with sign in link */}
          <div className="mt-8">
            <p className={`text-sm text-center
              ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Already have an account?{" "}
              <Link to="/sign-in" className={`underline hover:text-red-400 transition-colors
                ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
