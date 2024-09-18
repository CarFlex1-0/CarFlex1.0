import React, { useState } from 'react';
import axios from '@services/axios'; // Axios instance
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('user/reset-password', { 
        token, 
        newPassword: data.newPassword 
      });
      setSuccessMessage('Your password has been updated successfully.');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <form className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Reset Password</h2>

        {successMessage && (
          <p className="text-green-600 mb-4 text-center">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            {...register('newPassword', { 
              required: 'New password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            className={`input-style ${errors.newPassword ? 'border-red-500' : ''}`}
            placeholder="Enter new password"
          />
          {errors.newPassword && <p className="text-red-500 mt-1">{errors.newPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
