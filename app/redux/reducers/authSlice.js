import { AUTH, UN_AUTH } from "../../constants/actions";

const INITIAL_STATE = {
    error: "",
    message: "",
    content: "",
    fetching: false,
    authenticated: false
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        /** authentication process */
        case AUTH.REQUEST:
            return {
                ...state,
                fetching: true
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
            }
        /** cancel authentication process */
        case UN_AUTH.REQUEST:
            return {
                ...state,
                fetching: true,
            }
        case UN_AUTH.SUCCESS:
            return {
                ...state,
                fetching: false,
                authenticated: false,
            }
        case UN_AUTH.FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;