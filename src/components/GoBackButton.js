import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const GoBackButton = ({ path, onClick }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        // Navigate to the specified path or go back to the previous page
        if (onClick) {
            onClick();
        } else {
            navigate(path || -1); // Navigate back to the previous page
        }
    };

    return (
        <button
            onClick={handleGoBack}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
            <FaArrowAltCircleLeft className="mr-2" /> {/* Add margin for spacing */}
            Go Back
        </button>
    );
};

// PropTypes validation
GoBackButton.propTypes = {
    path: PropTypes.string, // Optional string for path
    onClick: PropTypes.func, // Optional function for custom onClick
};

export default GoBackButton;
