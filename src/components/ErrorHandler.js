// ErrorHandler.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorHandler = ({ error }) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!error.response) {
            // Network error
            navigate('/error'); // Navigate to the ErrorPage
        } else if (error.response.status >= 500) {
            // Server error
            navigate('/error'); // Navigate to the ErrorPage
        } else {
            // Handle other errors (e.g., validation errors)
            console.error(error.response.data.message || "An error occurred");
        }
    }, [error, navigate]);

    return null; // Render nothing, as navigation will happen in the effect
};

export default ErrorHandler;
