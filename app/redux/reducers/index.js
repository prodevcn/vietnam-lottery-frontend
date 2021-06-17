import { combineReducers } from "redux";
import bet from './betSlice';

export default combineReducers({
    bet: bet,
});