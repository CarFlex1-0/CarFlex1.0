import React, { useState } from 'react';
import axiosInstance from '@services/axios'; // Assuming axios is set up already
import { useForm } from 'react-hook-form'; // For form validation
import { Bounce, Slide, Zoom } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const saveChanges = async (data) => {
        try {
            // API call to update the profile info
            await axiosInstance.put('/profile/update', data);
            
            toast.success("Profile updated successfully", {
                position: "top-left",
                autoClose: 5000,
                theme: "dark",
                transition: Slide,
              });
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-blue-500 to-purple-700 flex flex-col items-center p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://via.placeholder.com/150" // user avatar
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-4 border-blue-500"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-blue-700">John Doe</h1>
                            <p className="text-gray-500">Full Stack Developer</p>
                        </div>
                    </div>
                    <button className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex border-b border-gray-200 mb-4">
                    {['overview', 'personal', 'account'].map(tab => (
                        <button
                            key={tab}
                            className={`py-2 px-4 ${
                                activeTab === tab ? 'border-b-4 border-blue-600 text-blue-600' : ''
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-xl font-bold text-blue-600">Profile Overview</h2>
                            <p className="text-gray-500 mt-2">
                                View your recent activities, ratings, and other statistics.
                            </p>
                        </div>
                    )}

                    {activeTab === 'personal' && (
                        <div>
                            <h2 className="text-xl font-bold text-blue-600">Personal Information</h2>
                            <form onSubmit={handleSubmit(saveChanges)} className="mt-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            {...register('firstName', { required: true })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.firstName && <p className="text-red-500 text-sm">First name is required.</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            {...register('lastName', { required: true })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.lastName && <p className="text-red-500 text-sm">Last name is required.</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            type="text"
                                            {...register('phone', { required: true })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm">Phone number is required.</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            {...register('location', { required: true })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.location && <p className="text-red-500 text-sm">Location is required.</p>}
                                    </div>
                                </div>
                                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div>
                            <h2 className="text-xl font-bold text-blue-600">Account Settings</h2>
                            <form onSubmit={handleSubmit(saveChanges)} className="mt-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        {...register('email', { required: true })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Change Password</label>
                                    <input
                                        type="password"
                                        {...register('password', { required: true })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">Password is required.</p>}
                                </div>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
