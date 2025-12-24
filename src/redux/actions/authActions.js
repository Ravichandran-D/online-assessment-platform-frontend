import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorHandler from '../../components/ErrorHandler';

// Base configuration for Axios
const API = axios.create({
  baseURL: process.env.BACKEND_URL || 'https://online-assessment-platform-backend-cmgj.onrender.com/api/auth'  // Replace with your backend API URL
});

// Add a request interceptor
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token'); // Adjust based on where you store your token

    if (token) {
      // Add the headers
      req.headers['Content-Type'] = 'application/json'; // Set content type
      req.headers['Authorization'] = `Bearer ${token}`; // Pass JWT token in header
    }
    return req; // Return the modified request
  },
  (error) => {
    // Handle any error that occurs before the request is sent
    return Promise.reject(error);
  }
);

// REGISTER
export const register = (userData) => async (dispatch) => {
  try {
    const response = await API.post('/register', userData);
    toast.success(response?.message || 'Register successful');
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    return response;
  } catch (error) {
    toast.error(error?.response?.data.error);
    console.log(error);
    dispatch({ type: 'REGISTER_FAIL', payload: error.response });
    <ErrorHandler error={error} />
  }
};

// LOGIN
export const login = (userData) => async (dispatch) => {
  try {
    const response = await API.post('/login', userData);
    toast.success(response.message || 'Login successful');
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    // Save data and token to localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', JSON.stringify(response.data?.token));
    return response.data;  // Return the response for successful login
  } catch (error) {
    toast.error(error.response?.data?.message || error.response?.data);
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    <ErrorHandler error={error} />
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('user'); // Clear user data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('submitedData');
  dispatch({ type: 'LOGOUT' });
  toast.success('Logout successful');
  return { message: 'Logout successful' };
};

//GET PROFILE
export const getProfile = (id) => async (dispatch) => {
  try {
    const response = await API.get(`/profile/${id}`);
    dispatch({ type: 'PROFILE_GET_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'PROFILE_GET_FAIL', payload: error.response });
    toast.error(error.response?.error);
    <ErrorHandler error={error} />
  }
};

// PROFILE UPDATE
export const updateProfile = (userData) => async (dispatch) => {
  try {
    const response = await API.put(`/profile/${userData.id}`, userData);
    toast.success(response?.data?.message || 'Profile updated successfully');
    dispatch({ type: 'PROFILE_UPDATE_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to update profile';
    dispatch({
      type: 'PROFILE_UPDATE_FAIL',
      payload: error.response ? error.response.data : error.message,
    });
    toast.error(errorMessage);
    <ErrorHandler error={error} />
  }
};
