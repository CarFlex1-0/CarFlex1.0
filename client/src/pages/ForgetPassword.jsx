import React, { useState } from 'react';
import axios from '@services/axios';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '@contexts/ThemeContext';

const ForgotPassword = () => {
  const { isDarkMode } = useTheme();
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
    <div className={`min-h-screen flex justify-center items-center transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#2b4e7e] to-black' 
        : 'bg-gradient-to-br from-blue-100 to-white'
    }`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl ${
          isDarkMode 
            ? 'bg-white/10 backdrop-blur-md border border-white/10' 
            : 'bg-white/60 backdrop-blur-md border border-white/20'
        } shadow-xl mx-4`}
      >
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Forgot Password?
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
          >
            {successMessage}
          </motion.div>
        )}

        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          >
            {errorMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
                })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 transition-colors`}
                placeholder="example@domain.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
              isDarkMode
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium transition-colors`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : (
              'Send Reset Instructions'
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/sign-in"
            className={`text-sm font-medium ${
              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
            }`}
          >
            ← Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
