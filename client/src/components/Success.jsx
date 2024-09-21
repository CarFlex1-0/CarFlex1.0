import React, { useEffect, useState } from 'react';
import axiosInstance from '@services/axios';
import { useAuth } from '../contexts/auth_context';
import { useLocation } from 'react-router-dom';

const Success = () => {
    const { user } = useAuth();
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const sessionId = new URLSearchParams(location.search).get('session_id'); // Retrieve sessionId from URL

    useEffect(() => {
        const pollPaymentStatus = async () => {
            try {
                const { data } = await axiosInstance.post('/payment/check-payment-status', {
                    sessionId,
                    userId: user._id,
                });

                if (data.status === 'success') {
                    setIsPaymentSuccess(true);
                    clearInterval(polling); // Stop polling once the payment is confirmed
                } else if (data.status === 'pending') {
                    // Continue polling
                    console.log('Payment still pending...');
                }
            } catch (err) {
                setError('Error checking payment status');
            }
        };

        // Poll every 5 seconds to check payment status
        const polling = setInterval(pollPaymentStatus, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(polling);
    }, [sessionId, user._id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isPaymentSuccess) {
        return (
            <div className="flex items-center justify-center h-screen bg-green-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-600">Subscription Successful!</h1>
                    <p className="mt-4 text-lg text-gray-700">Thank you for subscribing to our service.</p>
                    <p className="mt-2 text-gray-500">You can now access all the features of your subscription.</p>
                    <a href="/" className="mt-6 inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                        Go to Dashboard
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen bg-yellow-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-yellow-600">Payment Processing...</h1>
                <p className="mt-4 text-lg text-gray-700">Please wait while we confirm your payment.</p>
            </div>
        </div>
    );
};

export default Success;
