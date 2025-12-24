import React from 'react';
import bgImage from '../../assets/top-view-desk-concept-with-copy-space.jpg';
const TermsOfService = () => {
    return (
        <div
      className="w-screen min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
        > 
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Terms of Service</h1>
            <p className="text-gray-700 mb-4">
                Welcome to our online exam platform. By using our services, you agree to these terms. Please read them carefully.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">User Responsibilities</h2>
            <p className="text-gray-700 mb-4">
                Users are expected to maintain the confidentiality of their accounts and passwords and are responsible for all activities that occur under their account.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
                All content provided on this platform is owned by us or our licensors. Users may not reproduce or distribute any content without permission.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700">
                We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.
            </p>
        </div>
        </div>
    );
};

export default TermsOfService;
