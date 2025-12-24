import React from 'react';
import bgImage from '../../assets/top-view-desk-concept-with-copy-space.jpg';
const About = () => {
    return (
        <div
      className="w-screen min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
        >       
       <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
            <p className="text-gray-700 mb-4">
                Welcome to our online exam platform! We are dedicated to providing a seamless and efficient experience for both students and educators.
                Our mission is to simplify the examination process and offer comprehensive tools for assessment.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Our Features</h2>
            <ul className="list-disc list-inside mb-6">
                <li className="mb-2">Exam Scheduling: Easily schedule your exams with our intuitive interface.</li>
                <li className="mb-2">Automated Grading: Save time with our automated grading system.</li>
                <li className="mb-2">Detailed Analytics: Get insights into student performance and exam results.</li>
                <li className="mb-2">Secure Environment: We prioritize the security and integrity of every exam.</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Our Team</h2>
            <p className="text-gray-700">
                Our team consists of experienced educators and tech professionals committed to enhancing the online examination experience. 
                We continuously strive to improve our platform based on user feedback.
            </p>
        </div>
        </div>
    );
};

export default About;
