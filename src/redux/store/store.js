// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../reducers/rootReducer'; // rootReducer

const store = createStore(rootReducer, applyMiddleware(thunk));

// Check localStorage for user data and initialize state
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
if (user) {
  store.dispatch({ type: 'LOGIN_SUCCESS', payload: user });
}

export default store;
