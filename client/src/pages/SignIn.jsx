import React, { useState } from 'react';
import axios from '@services/axios'; // Use your axios instance
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Loading icon

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null); // Clear previous error messages
    try {
      const response = await axios.post('user/login', data);
      console.log('User signed in:', response.data);
      // Success action: redirect or store token
    } catch (error) {
      setErrorMessage('Sign In failed. Please check your credentials and try again.');
      console.error('Sign In error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <form className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Sign In</h2>

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

        <div className="mb-5">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className={`input-style ${errors.password ? 'border-red-500' : ''}`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center mb-5 justify-between">
         <div>
           <input
            type="checkbox"
            {...register('rememberMe')}
            className="mr-2"
            id="rememberMe"
          />
          <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
         </div>
           <a href="/forgot-password" className="text-purple-700 underline justify-end">Forgot Password?</a>
        </div>
           
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          ) : (
            'Sign In'
          )}
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account? <a href="/sign-up" className="text-purple-700 underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
