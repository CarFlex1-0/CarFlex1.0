import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "@services/axios";
import { Slide } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, useTheme } from "@contexts/ThemeContext";
import { useAuth } from "@contexts/auth_context";

const FeedbackFormContent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (!user?._id) {
        toast.error("Please login to submit feedback", {
          position: "top-left",
          autoClose: 5000,
          theme: isDarkMode ? "dark" : "light",
          transition: Slide,
        });
        return;
      }

      await axios.post("/feedback", {
        content: data.content,
        rating,
        author: user._id,
      });

      toast.success("Feedback submitted successfully!", {
        position: "top-left",
        autoClose: 5000,
        theme: isDarkMode ? "dark" : "light",
        transition: Slide,
      });
      reset();
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback.", {
        position: "top-left",
        autoClose: 5000,
        theme: isDarkMode ? "dark" : "light",
        transition: Slide,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      } py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center`}
    >
      <div className="w-full max-w-md">
        <button
          onClick={toggleTheme}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isDarkMode
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-800 text-white"
          }`}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <div className="relative">
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-900 to-purple-900"
                : "bg-gradient-to-r from-blue-400 to-purple-500"
            } shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl`}
          ></div>
          <div
            className={`relative ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg sm:rounded-3xl p-8`}
          >
            <h1
              className={`text-3xl font-bold mb-6 text-center ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Your Feedback Matters
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="content"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Feedback
                </label>
                <textarea
                  id="content"
                  {...register("content", { required: "Feedback is required" })}
                  rows="4"
                  className={`block w-full ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  } border ${
                    errors.content
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-3`}
                ></textarea>
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-2`}
                >
                  Rating
                </label>
                <div className="flex justify-center items-center space-x-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 cursor-pointer ${
                        rating >= star
                          ? "text-yellow-500"
                          : isDarkMode
                          ? "text-gray-600"
                          : "text-gray-300"
                      } transition-transform duration-150 ease-in-out hover:-translate-y-0.5 hover:scale-110`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8 2.4-4.8z" />
                    </svg>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-6 ${
                  isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold rounded-md shadow-sm ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                } transition-colors duration-150 ease-in-out`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackForm = () => {
  return (
    <ThemeProvider>
      <FeedbackFormContent />
    </ThemeProvider>
  );
};

export default FeedbackForm;
