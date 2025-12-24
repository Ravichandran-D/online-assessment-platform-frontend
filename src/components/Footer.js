import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-red-700 fixed bottom-0 w-full text-white p-3">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Left Section - Links */}
                <div className="hidden md:flex flex-wrap justify-center md:justify-start mb-4 md:mb-0 ml-[180px]">
                    <a href="/about" className="text-sm text-gray-400 hover:text-white ml-13 underline">
                        About Us
                    </a>
                    <a href="/privacy" className="text-sm text-gray-400 hover:text-white ml-12 underline">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-sm text-gray-400 hover:text-white ml-12 underline">
                        Terms of Service
                    </a>
                </div>

                {/* Center Section - Social Media Icons */}
                <div className="flex justify-center space-x-4 mb-2 md:mb-0">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>

                {/* Right Section - Copyright */}
                <div className="text-sm text-gray-400 text-center md:text-right">
                    &copy; {new Date().getFullYear()} Assessment Platform. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
