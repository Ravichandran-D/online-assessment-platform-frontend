import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorHandler from '../../components/ErrorHandler';

import { CREATE_QUESTION, DELETE_QUESTION, GET_QUESTIONS, UPDATE_QUESTION } from '../../constants/questions';

// Base configuration for Axios
const API = axios.create({
    baseURL: process.env.BACKEND_URL || 'https://online-assessment-platform-backend-cmgj.onrender.com/api/questions'  // Replace with your backend API URL
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

// Create Question
export const createQuestion = (questionData) => async (dispatch) => {
    try {
        const response = await API.post('/add', questionData);
        toast.success(response?.data?.message || 'Question created successfully!');
        dispatch({ type: CREATE_QUESTION, payload: response.data });
    } catch (error) {
        toast.error(`Error creating question: ${error.response?.data?.message || error.message}`);
        <ErrorHandler error={error} />
    }
};

// Get Questions
export const getQuestions = () => async (dispatch) => {
    try {
        const response = await API.get('/');
        await dispatch({ type: GET_QUESTIONS, payload: response?.data });
    } catch (error) {
        toast.error(`Error fetching questions: ${error.response?.data?.message || error.message}`);
        <ErrorHandler error={error} />
    }
};

// Update Question
export const updateQuestion = (id, questionData) => async (dispatch) => {
    try {
        const response = await API.put(`/${id}`, questionData);
        dispatch({ type: UPDATE_QUESTION, payload: response.data });
        toast.success('Question updated successfully!');
    } catch (error) {
        toast.error(`Error updating question: ${error.response?.data?.message || error.message}`);
        <ErrorHandler error={error} />
    }
};

// Delete Question
export const deleteQuestion = (id) => async (dispatch) => {
    try {
        const { response } = await API.delete(`/${id}`);
        toast.success(response?.data?.message || 'Question deleted successfully!');
        dispatch({ type: DELETE_QUESTION, payload: id });
    } catch (error) {
        toast.error(`Error deleting question: ${error.response?.data?.message || error.message}`);
        <ErrorHandler error={error} />
    }
};