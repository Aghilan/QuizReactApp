import { combineReducers } from 'redux';
import question from './question';
import single from './single';

const allReducer = combineReducers({
  question,
  single
});

export default allReducer;
