const initialState = {
    students: [],
    activity: [],
    proctor: [],
    error: null
};

//students reducer
export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_STUDENTS':
            return { ...state, students: action.payload };
        case 'DELETE_STUDENT':
            return { ...state, students: state.students.filter(student => student._id !== action.payload) };
        case 'UPDATE_EXAM_PERMISSION':
            return {
                ...state,
                students: state.students.map(student =>
                    student._id === action.payload.id ? { ...student, examPermission: action.payload.permission } : student
                ),
            };
        case 'UPDATE_ROLE':
            return {
                ...state,
                students: state.students.map((student) =>
                    student._id === action.payload.id
                        ? { ...student, role: action.payload.role }
                        : student
                ),
            };
        case "CREATE_STUDENTS_ACTIVITY":
            return {
                ...state,
                activity: action.payload
            };
        case "GET_STUDENTS_ACTIVITY":
            return {
                ...state,
                activity: action.payload
            }
        case "CREATE_PROCTOR_INCIDENT":
            return {
                ...state,
                proctor: action.payload
            };
        case "GET_PROCTOR_INCIDENT":
            return {
                ...state,
                proctor: action.payload
            };
        case "GET_PROCTOR_ERROR":
            return {
                ...state,
                error: action.payload
            }
        case 'UPDATE_ROLE_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
