import {combineReducers} from 'redux';

// import count from './count';
import CurrentUser from './current_user';

const allReducers = combineReducers({
  cuser: CurrentUser
});

export default allReducers;