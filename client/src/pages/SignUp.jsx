import React, { useState } from 'react';
import axios from '@services/axios'; // Use your axios instance
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Loading icon

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null); // Clear previous error messages
    try {
      const response = await axios.post('user/register', data);
      console.log('User registered:', response.data);
      // Success action: redirect or show success message
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error('Registration error:', error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-purple-50 px-4">
      <form className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Create an Account</h2>

        {errorMessage && (
          <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 mb-2">First Name</label>
          <input 
            {...register('firstName', { required: 'First Name is required' })} 
            className={`input-style ${errors.firstName ? 'border-red-500' : ''}`} 
            placeholder="John"
          />
          {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input 
            {...register('lastName', { required: 'Last Name is required' })} 
            className={`input-style ${errors.lastName ? 'border-red-500' : ''}`} 
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input 
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
            {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 6, message: 'Password must be at least 6 characters' } 
            })} 
            className={`input-style ${errors.password ? 'border-red-500' : ''}`} 
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          className="btn-primary w-full flex items-center justify-center" 
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          ) : (
            'Create Account'
          )}
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account? <a href="/sign-in" className="text-purple-700 underline">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
