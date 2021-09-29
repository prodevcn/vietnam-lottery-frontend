import { SET_USER, REMOVE_USER, SET_ONLY_USER, SET_BALANCE } from "../../constants/actions";

const INITIAL_STATE = {
  token: null,
  balance: 0,
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case SET_ONLY_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        token: null,
        user: null,
      };
    case SET_BALANCE:
      console.log(action.payload);
      return {
        ...state,
        balance: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
