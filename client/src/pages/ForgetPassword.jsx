import React, { useState } from 'react';
import axios from '@services/axios'; // Your axios instance
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('user/forgot-password', data);
      setSuccessMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <form className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Forgot Password</h2>

        {successMessage && (
          <p className="text-green-600 mb-4 text-center">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
            })}
            className={`input-style ${errors.email ? 'border-red-500' : ''}`}
            placeholder="example@domain.com"
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          ) : (
            'Send Reset Email'
          )}
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Remember your password? <a href="/sign-in" className="text-purple-700 underline">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
