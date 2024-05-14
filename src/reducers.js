import {combineReducers} from 'redux';
import usersReducer from './usersReducer';
const rootReducers = combineReducers({
users : usersReducer
});
export default rootReducers;