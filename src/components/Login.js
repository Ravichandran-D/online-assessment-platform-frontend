import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../redux/actions/authActions';
import ErrorHandler from '../components/ErrorHandler';
import bgImage from '../assets/top-view-desk-concept-with-copy-space.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //handle login
    const handleLogin = async (e) => {
        const formData = { email: email, password: password }
        e.preventDefault();
        try {
            const response = await dispatch(login(formData));  // Correct usage of dispatch with await            
            if (response) {
                setTimeout(() => {
                    if (response?.user?.role === 'student') {
                        navigate('/student/dashboard');
                    } else if (response?.user?.role === 'admin') {
                        navigate('/admin/dashboard');
                    }
                }, 1000);
            }
        } catch (error) {
            console.error("Login failed", error);
            toast.error("Login failed, please try again.");
            <ErrorHandler error={error} />
        }
    };

    return (
        <div
   className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
            <div className='p-4'>
                <h2 className="text-4xl font-bold text-blue-500">Online Assessment Platform</h2>
            </div>
            <form action="" onSubmit={handleLogin} className='w-96 p-6 bg-white rounded'>
                <h2 className='mb-8 text-4xl font-bold text-blue-500'>Login</h2>
                <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border border-blue-500 rounded w-full p-2 mb-4' />
                <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border border-blue-500 rounded w-full p-2 mb-4' />
                <button className='bg-blue-500 border-none rounded text-white p-2 w-full'>Login</button>
                <div className='mt-4'>
                    <p >Don't have an account?
                        <Link to="/register" className='ml-4 underline text-blue-500' >Register</Link>
                    </p>
                </div>
            </form>
            {/* ToastContainer */}
            <ToastContainer />
        </div>

    )
}

export default Login;