import { CREATE_QUESTION, GET_QUESTIONS, UPDATE_QUESTION, DELETE_QUESTION } from '../../constants/questions';

const initialState = {
    questions: [],
};

//Reducer for question bank
const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUESTIONS:
            return { ...state, questions: action.payload };
        case CREATE_QUESTION:
            return { ...state, questions: [...state.questions, action.payload] };
        case UPDATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map(q => (q._id === action.payload._id ? action.payload : q)),
            };
        case DELETE_QUESTION:
            return { ...state, questions: state.questions.filter(q => q._id !== action.payload) };
        default:
            return state;
    }
};

export default questionReducer;
