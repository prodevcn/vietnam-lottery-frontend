import { AUTH, LOGOUT } from "../../constants/actions";

const INITIAL_STATE = {
    error: null,
    fetching: false,
    authenticated: false
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        /** authentication process */
        case AUTH.REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case AUTH.FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            };
        case AUTH.SUCCESS:
            return {
                ...state,
                fetching: false,
                authenticated: true,
                error: null,
            }
        /** cancel authentication process */
        case LOGOUT:
            return {
                ...state,
                fetching: false,
                authenticated: false,
            }
        default:
            return state;
    }
}

export default authReducer;