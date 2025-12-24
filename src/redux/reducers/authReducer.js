const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  userData: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return { ...state, isAuthenticated: false, error: action.payload };
    case 'PROFILE_GET_SUCCESS':
      return { ...state, ...state, isAuthenticated: true, userData: action.payload };
    case 'PROFILE_GET_FAIL':
      return { ...state, isAuthenticated: false, error: action.payload };
      case 'PROFILE_UPDATE_SUCCESS':
        return { ...state, ...state, isAuthenticated: true, userData: action.payload };
      case 'PROFILE_UPDATE_FAIL':
        return { ...state, isAuthenticated: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
