import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
 
import betReducer from './betSlice';
import authReducer from './authSlice';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    bet: betReducer,
});