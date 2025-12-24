import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegSadCry } from 'react-icons/fa'; // Optional icon for better UX

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        // Navigate back to the previous page
        navigate(-1); // Go back one step in the history stack
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="text-center">
                <FaRegSadCry className="text-6xl text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h1>
                <p className="text-gray-600 mb-4">We couldn't complete your request due to a network issue or server error. Please try again later.</p>
                <button 
                    onClick={handleRetry} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
