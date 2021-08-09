import {SET_USER, REMOVE_USER} from '../../constants/actions';

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