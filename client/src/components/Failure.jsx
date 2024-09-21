import React from 'react';

const Failure = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-red-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">Subscription Failed!</h1>
                <p className="mt-4 text-lg text-gray-700">We're sorry, but your subscription could not be processed.</p>
                <p className="mt-2 text-gray-500">Please try again or contact support if the issue persists.</p>
                <a href="/" className="mt-6 inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                    Go Back
                </a>
            </div>
        </div>
    );
};

export default Failure;
