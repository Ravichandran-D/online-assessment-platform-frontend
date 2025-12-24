
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../redux/actions/authActions';
import { FaBars, FaTimes, FaBell } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = (props) => {
    const { toggle, isOpen } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState();

    const handleProfileClick = () => {
        navigate('profile'); // Navigate to profile update page
        setDropdownOpen(false); // Close dropdown
    };

    const handleLogout = async () => {
        // Implement logout logic here
        const response = await dispatch(logout());
        if (response) {
            navigate('/login')
        }
        setDropdownOpen(false);
    };



    // Extract initials from the logged-in user's name
    const getInitials = (name) => {
        const nameParts = name?.split(' ');
        return nameParts?.map(part => part[0]).join('').toUpperCase();
    };

    //useEffect
    useEffect(() => {
        const loggedInUser = user?.name; // Replace with your actual logic to get the current user
        const initials = getInitials(loggedInUser);
        setUserName(initials);
    }, [user])

    return (
        <header className="col-span-full flex justify-between items-center sticky top-0 p-2  text-white bg-gradient-to-r from-blue-600 to-red-900">
            <div className=" lg:hidden">
                <button onClick={toggle} className="p-2 focus:outline-none">
                    {
                        isOpen ? (
                            <FaTimes className="text-2xl" />
                        ) : (
                            <FaBars className="text-2xl" />
                        )
                    }
                </button>
            </div>

            {/* Left Logo */}
            <div
                className="flex items-center text-sm font-bold p-2 rounded cursor-pointer"
                onClick={() => navigate('/')}
            >
                <img src={logo} alt="logo" className="mr-2 rounded" width={28} />
                <h2>Online Assessment Platform</h2>
            </div>

            {/* Right Profile Section */}
            <div className="relative">
                <div
                    className="flex items-center justify-evenly"
                >
                    <span className='mr-4 cursor-pointer hover:text-lg'><FaBell /></span>
                    <span className='mr-2'> {"Hi,  " + user.name.toUpperCase()}</span>
                    <span
                        className="flex items-center justify-center w-6 h-6 bg-white font-bold text-black rounded-full"
                    > {userName}</span>
                    {/* Show user's initials */}

                    <span
                        className='ml-4 cursor-pointer'
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {dropdownOpen ? (
                            <i className="fa fa-caret-up fa-2x"></i>
                        ) : (
                            <i className="fa fa-caret-down fa-2x"></i>
                        )}
                    </span>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                        <div
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={handleProfileClick}
                        >
                            My Profile
                        </div>
                        <hr />
                        <div
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </header >
    );
};

export default Header;
