import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { examReducer } from './examReducer';
import { studentReducer } from './studentReducers';
import questionReducer from './questionReducer';
import examSubmitReducer from './examSubmitReducer';
import studentResultReducer from './studentResultReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  exams: examReducer,
  question: questionReducer,
  studentState: studentReducer,
  examSubmit: examSubmitReducer,
  studentResult: studentResultReducer,
});

export default rootReducer;
