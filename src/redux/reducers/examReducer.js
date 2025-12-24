import { CREATE_EXAM, GET_EXAMS, CREATE_EXAM_FAIL, GET_EXAM_FAIL, DELETE_EXAM, DELETE_EXAM_FAIL, EDIT_EXAM_FAILURE, EDIT_EXAM_SUCCESS, GET_EXAM_BY_ID } from '../../constants/examConstants';

const initialState = {
    exams: [],
    user: [],
    submittedData: [],
    examDetails: [],
    isLoading: false,
    error: null,
};

export const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXAMS:
            return {
                ...state,
                exams: action.payload.exams,
                submittedData: action.payload.submittedData,
                user: action.payload.user?.[0]
            };
        case GET_EXAM_BY_ID:
            return { ...state, examDetails: action.payload }
        case CREATE_EXAM:
            return { ...state, exams: [...state.exams, action.payload] };
        case CREATE_EXAM_FAIL:
        case GET_EXAM_FAIL:
        case DELETE_EXAM_FAIL:
        case EDIT_EXAM_FAILURE:
            return { ...state, error: action.payload };
        case EDIT_EXAM_SUCCESS:
            return { ...state, exams: action.payload };
        case DELETE_EXAM:
            return {
                ...state,
                loading: false,
                exams: state.exams.filter((exam) => exam._id !== action.payload), // Remove deleted exam
            };
        default:
            return state;
    }
};
