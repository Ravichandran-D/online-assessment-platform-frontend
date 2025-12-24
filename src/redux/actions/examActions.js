import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorHandler from '../../components/ErrorHandler';

import {
  CREATE_EXAM, GET_EXAMS,
  CREATE_EXAM_FAIL,
  GET_EXAM_FAIL, DELETE_EXAM_FAIL,
  DELETE_EXAM, EDIT_EXAM_FAILURE,
  EDIT_EXAM_SUCCESS,
  GET_EXAM_BY_ID
} from '../../constants/examConstants';

// Base configuration for Axios
const API = axios.create({
  baseURL: process.env.BACKEND_URL || 'https://online-assessment-platform-backend-cmgj.onrender.com/api/exam'  // Replace with your backend API URL
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

//create exams
export const createExam = (examData) => async (dispatch) => {
  try {
    const { data } = await API.post('/exams', examData);
    toast.success(data?.message || 'created successful');
    dispatch({ type: CREATE_EXAM, payload: data });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: CREATE_EXAM_FAIL, payload: error.response?.data?.message });
    <ErrorHandler error={error} />
  }
};

//get exams
export const getExams = (id) => async (dispatch) => {
  try {
    const { data } = await API.get(`/`);
    dispatch({ type: GET_EXAMS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: GET_EXAM_FAIL, payload: error?.response });
    toast.error(error);
    <ErrorHandler error={error} />
  }
};

// Get exam by ID
export const getExamById = (id) => async (dispatch) => {
  try {
    const { data } = await API.get(`/exams/${id}`); // API call to fetch exam by ID
    dispatch({ type: GET_EXAM_BY_ID, payload: data }); // Dispatch the fetched exam data
    return data;
  } catch (error) {
    dispatch({ type: GET_EXAM_FAIL, payload: error?.response });
    toast.error(`Error fetching exam: ${error?.response?.data?.message || error.message}`);
    <ErrorHandler error={error} />;
  }
};


//delete exam
export const updateExam = (id, examData) => async (dispatch) => {
  try {
    const { data } = await API.put(`/exams/${id}`, examData);
    toast.success(data?.message || 'Exam update successful');
    dispatch({ type: EDIT_EXAM_SUCCESS, payload: data });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: EDIT_EXAM_FAILURE, payload: error.message || 'Failed to delete the exam' });
    <ErrorHandler error={error} />
  }
};


//delete exam
export const deleteExam = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/exams/${id}`);
    toast.success(data?.message || 'Deleted successful');
    dispatch({ type: DELETE_EXAM, payload: id });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: DELETE_EXAM_FAIL, payload: error.message || 'Failed to delete the exam' });
    <ErrorHandler error={error} />
  }
};
