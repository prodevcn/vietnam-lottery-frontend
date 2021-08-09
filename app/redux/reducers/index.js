import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
 
import betReducer from './betSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import gameReducer from './gameSlice';

export default combineReducers({
    form: formReducer,
    user: userReducer,
    auth: authReducer,
    bet: betReducer,
    game: gameReducer,
});