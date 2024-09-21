import React, { useEffect, useState } from 'react';
import axiosInstance from '@services/axios';
import { useAuth } from '../contexts/auth_context';
const SubscriptionSelect = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const {user} = useAuth()
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const { data } = await axiosInstance.get('/subscriptions');
                console.log(data); // Log the fetched data
                if (Array.isArray(data)) {
                    setSubscriptions(data);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };
        fetchSubscriptions();
    }, []);

    const handleCheckout = async (priceId, planName) => {
        const { data } = await axiosInstance.post('/payment/create-checkout-session', { priceId,  planName, userId :user._id});
        window.location.href = data.url; // Redirect to Stripe checkout
    };

    return (
        <div className="flex flex-col items-center my-11">
            <h1 className="text-3xl font-bold mb-6">Choose Your Subscription</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptions.map((sub) => (
                    <div key={sub._id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 py-8">
                        <h2 className="text-xl font-semibold">{sub.name}</h2>
                        <p className="text-gray-500">{sub.description}</p>
                        <p className="text-2xl font-bold">${sub.price}</p>
                        <button
                            onClick={() => handleCheckout(sub.stripePriceId, sub.name)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionSelect;
