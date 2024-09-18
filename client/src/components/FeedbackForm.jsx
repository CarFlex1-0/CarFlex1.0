import React from "react";
import { useForm } from "react-hook-form";
import axios from "@services/axios";

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Include author reference
      const authorId = "some-user-id"; // You need to get the current user's ID

      await axios.post("feedback", {
        ...data,
        rating,
        author: authorId || "", // Send author ID here
      });
      alert("Feedback submitted successfully!");
      reset();
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[70vh] mx-auto p-8 bg-white rounded-lg shadow-lg max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-500 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-indigo-500">
        Feedback Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            {...register("content", { required: "Content is required" })}
            rows="4"
            className={`block w-full bg-gray-100 border ${
              errors.content ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-900 p-3`}
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => setRating(star)}
                className={`w-8 h-8 cursor-pointer ${
                  rating >= star ? "text-yellow-500" : "text-gray-300"
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
          className={`w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-sm ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          } transition-colors duration-150 ease-in-out`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
