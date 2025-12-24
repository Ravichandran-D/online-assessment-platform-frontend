const initialState = {
    results: null,      // This will hold the student result data
    loading: false,    // This indicates whether the API call is in progress
    error: null,       // This will hold any error messages
};

const studentResultReducer = (state = initialState, action) => {    
    switch (action.type) {
        case 'GET_RESULT_SUCCESS':
            return {
                ...state,
                results: action.payload, // Set the result to the data returned from the API
                loading: false,         // Loading is complete
                error: null,           // Clear any previous errors
            };
        case 'GET_RESULT_FAIL':
            return {
                ...state,
                loading: false,        // Loading is complete
                error: action.payload, // Set the error message
            };
        default:
            return state; // Return the current state for any unrecognized action types
    }
};

export default studentResultReducer;
