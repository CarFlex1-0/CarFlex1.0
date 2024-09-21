// PaymentForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axiosInstance from '@services/axios';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error: cardError } = await stripe.createToken(cardElement);

        if (cardError) {
            setError(cardError.message);
            return;
        }

        try {
            const response = await axiosInstance.post('payment/create-payment-intent', {
                amount: 5000, // amount in cents
            });

            const paymentData = response.data; // Use response.data instead of response.json()

            if (paymentData.error) {
                setError(paymentData.error);
            } else {
                setSuccess('Payment successful!');
                setError(''); // Clear any previous errors
            }
        } catch (err) {
            setError('Failed to process payment. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Payment</h2>
            <CardElement className="p-3 border border-gray-300 rounded mb-4" />
            <button 
                type="submit" 
                disabled={!stripe} 
                className={`w-full py-2 text-white font-semibold rounded ${!stripe ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                Pay
            </button>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {success && <div className="text-green-500 mt-4">{success}</div>}
        </form>
    );
};

export default PaymentForm;
