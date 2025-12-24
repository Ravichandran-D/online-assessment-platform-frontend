import React from 'react';
import bgImage from '../../assets/top-view-desk-concept-with-copy-space.jpg';
const PrivacyPolicy = () => {
    return (
        <div
      className="w-screen min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
        > 
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
            <p className="text-gray-700 mb-4">
                Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our online exam platform.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
            <ul className="list-disc list-inside mb-6">
                <li className="mb-2">Personal Information: We may collect personal information such as your name, email address, and role.</li>
                <li className="mb-2">Usage Data: We collect data about how you interact with our platform, including exam attempts and scores.</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
                We use your information to provide, maintain, and improve our services, and to communicate with you.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
            <p className="text-gray-700">
                We take reasonable measures to protect your information from unauthorized access, use, or disclosure.
            </p>
        </div>
        </div>
    );
};

export default PrivacyPolicy;
