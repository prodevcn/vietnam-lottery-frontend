import {SET_USER, REMOVE_USER, SET_ONLY_USER} from '../../constants/actions';

const INITIAL_STATE = {
    token: null,
    user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case SET_ONLY_USER:
            return {
                ...state,
                user: action.payload
            }
        case REMOVE_USER:
            return {
                ...state,
                token: null,
                user: null
            };
        default:
            return state;
    }
};

export default userReducer;