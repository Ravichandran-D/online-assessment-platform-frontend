import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCalendarDay, FaUserGraduate, FaRegQuestionCircle, FaUserCircle, FaChartLine } from 'react-icons/fa'; // Icons from react-icons
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
    const { isOpen } = props;
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if user is admin
    useEffect(() => {
        if (user && user.role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    return (
        <aside
            className={`w-[15%] z-10 float-left ${isOpen ? 'block' : 'hidden'} lg:block`}
        >
            <div
                className={`fixed left-0 h-full bg-gradient-to-r from-red-900 to-blue-600 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }  lg:translate-x-0`}
            >
                <div className="flex flex-col items-center justify-center py-4">
                    {isAuthenticated && user && user?.role ? (
                        <>
                            <FaUserCircle size={64} />
                            <span className="mt-3 text-lg uppercase font-semibold">{user?.role}</span>
                            <span className="mt-3 text-sm">{user?.email}</span>
                        </>
                    ) : ("")}
                </div>
                <div className="flex flex-col h-full">
                    {/* Sidebar Items */}
                    <nav className="flex-1 p-4 space-y-4">
                        <NavItem icon={<FaHome />} name="Dashboard" path="/" />
                        <NavItem icon={<FaUser />} name="Profile" path="profile" />
                        {isAdmin ? (
                            <>
                                <NavItem icon={<FaCalendarDay />} name="Exams" path="exams" />
                                <NavItem icon={<FaRegQuestionCircle />} name="Question Banks" path="questions" />
                                <NavItem icon={<FaUserGraduate />} name="Students List" path="students" />
                            </>
                        ) : (
                            <>
                                <NavItem icon={<FaCalendarDay />} name="Exams" path="exams" />
                                <NavItem icon={<FaChartLine />} name="Results" path="results" />
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </aside>
    );
};

// Individual Nav Item component
const NavItem = ({ icon, name, path }) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `group flex items-center space-x-4 p-2 rounded cursor-pointer ${isActive ? 'bg-red-700 text-white' : 'hover:bg-black text-gray-200'
                }`
            }
        >
            <div className="text-xl">{icon}</div>
            <span className="text-sm font-medium">{name}</span>
        </NavLink>
    );
};

export default Sidebar;
