import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorHandler from '../../components/ErrorHandler';

// Base configuration for Axios
const API = axios.create({
    baseURL: process.env.BACKEND_URL || 'https://online-assessment-platform-backend-cmgj.onrender.com/api/students'  // Replace with your backend API URL
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

export const getAllStudents = () => async (dispatch) => {
    try {
        const { data } = await API.get('/');
        dispatch({ type: 'GET_ALL_STUDENTS', payload: data });
    } catch (error) {
        console.error(error);
        <ErrorHandler error={error} />
    }
};

export const deleteStudent = (id) => async (dispatch) => {
    try {
        const { data } = await API.delete(`/${id}`);
        toast.success(data?.message || 'Deleted successfully');
        dispatch({ type: 'DELETE_STUDENT', payload: id });
    } catch (error) {
        console.error(error);
        <ErrorHandler error={error} />
    }
};

export const updateExamPermission = (id, permission) => async (dispatch) => {
    try {
        const { data } = await API.put(`/permission/${id}`, { examPermission: permission });
        toast.success(data?.message || 'Permission updated successfully');
        dispatch({ type: 'UPDATE_EXAM_PERMISSION', payload: { id, permission } });
    } catch (error) {
        console.error(error);
        <ErrorHandler error={error} />
    }
};

//create students activities
export const createStudentsActivity = (activityData) => async (dispatch) => {
    try {
        const { data } = await API.post('/activity', activityData);
        dispatch({ type: 'CREATE_STUDENTS_ACTIVITY', payload: data });
    } catch (error) {
        console.error(error);
        <ErrorHandler error={error} />
    }
};

export const getStudentsActivity = () => async (dispatch) => {
    try {
        const { data } = await API.get('/activity');
        dispatch({ type: 'GET_STUDENTS_ACTIVITY', payload: data });
    } catch (error) {
        console.error(error);
        <ErrorHandler error={error} />
    }
};

export const createProctor = (proctorData) => async (dispatch) => {
    try {
        const { data } = await API.post('/proctor', proctorData);
        dispatch({ type: 'CREATE_PROCTOR_INCIDENT', payload: data });
    } catch (error) {
        console.error(error);
        <ErrorHandler error={error} />
    }
};

export const getProctor = (id) => async (dispatch) => {
    try {
        const { data } = await API.get(`/proctor/${id}`);
        dispatch({
            type: 'GET_PROCTOR_INCIDENT', payload: data.proctor
        });
    } catch (error) {
        dispatch({ type: 'GET_PROCTOR_ERROR', payload: error.response.data });
        console.error(error);
        <ErrorHandler error={error} />
    }
};

//handle role chnage
export const updateRole = (role, id) => async (dispatch) => {
    try {
        const response = await API.put(`/role/${id}`, role);
        toast.success(response?.message || 'Role updated successfully');
        dispatch({
            type: 'UPDATE_ROLE', payload: { id, role: role.role } // Dispatch the updated role
        });
    } catch (error) {
        dispatch({ type: 'UPDATE_ROLE_ERROR', payload: error.response });
        console.error(error);
        <ErrorHandler error={error} />
    }
};