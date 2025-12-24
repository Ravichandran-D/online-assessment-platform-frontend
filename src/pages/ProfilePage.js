import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { getProfile, updateProfile } from '../redux/actions/authActions';
import { formatDateToInput } from "../utils/dateUtils";
import ErrorHandler from '../components/ErrorHandler';
import { FaSpinner } from 'react-icons/fa';

const ProfileUpdate = () => {
    const { user, userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const hasFetchedProfile = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: user?.id,
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "",
        dob: "",
        address: "",
        gender: "",
    });

    useEffect(() => {
        const getUserProfile = async (data) => {
            let id = data || user.id;
            setIsLoading(true); // Start loading
            try {
                await dispatch(getProfile(id));
            } catch (error) {
                console.error(error);
                toast.error('Failed to get profile');
                <ErrorHandler error={error} />
            } finally {
                setIsLoading(false); // Stop loading
            }
        };
    
        if (!hasFetchedProfile.current) {
            getUserProfile(user.id);
            hasFetchedProfile.current = true; // Mark as fetched
        }
    }, [dispatch, user.id]); // Removed getUserProfile from dependencies
    

    useEffect(() => {
        // Update formData when userData changes
        if (userData?.profile) {
            setFormData({
                id: user.id,
                name: user.name || "",
                email: user.email || "",
                role: user.role || "",
                dob: formatDateToInput(userData.profile.dob) || "",
                address: userData.profile.address || "",
                gender: userData.profile.gender || "",
            });
        }
    }, [userData, user]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(updateProfile(formData));
            if (response) {
                dispatch(getProfile(JSON.stringify(response._id)));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
            <ErrorHandler error={error} />
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white border border-slate-400 shadow-md overflow p-8 pb-16 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center">Profile</h2>
            {isLoading ? (
                <div className="text-center">
                    <FaSpinner className="animate-spin text-gray-500" size={24} />
                    <p className="text-gray-500">Loading...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-gray-200 border border-blue-500 w-full p-2 mb-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-gray-200 border border-blue-500 w-full p-2 mb-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* DOB */}
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            className="border border-blue-500 w-full p-2 mb-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="border border-blue-500 w-full p-2 mb-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your address"
                            rows="3"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <div className="mt-1 flex items-center space-x-4">
                            {['male', 'female', 'other'].map((gender) => (
                                <label className="flex items-center" key={gender}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={formData.gender === gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2 capitalize">{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 mt-2 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    );
};

export default ProfileUpdate;
