import { EXAM_SUBMIT_REQUEST, EXAM_SUBMIT_SUCCESS, EXAM_SUBMIT_FAIL } from "../../constants/examConstants";

const initialState = {
    loading: false,
    success: false,
    submitedData: [],
    error: null,
};

const examSubmitReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAM_SUBMIT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };

        case EXAM_SUBMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                submitedData: action.payload,
                error: null,
            };

        case "GET_SUBMIT_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                submitedData: action.payload,
                error: null,
            }

        case EXAM_SUBMIT_FAIL:
        case "GET_SUBMIT_FAIL":
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };


        default:
            return state;
    }
};

export default examSubmitReducer;
