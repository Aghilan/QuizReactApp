import { combineReducers } from 'redux';
import question from './question';
import single from './single';
import image from './image';


const allReducer = combineReducers({
  question,
  single,
  image
});

export default allReducer;
