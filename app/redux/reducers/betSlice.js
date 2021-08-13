import { FETCH_BET_HISTORY } from "../../constants/actions";

const initialState = {
  fetching: false,
  betHistory: [],
  betInfo: {},
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BET_HISTORY.REQUEST: {
      return {
        ...state,
        error: null,
        fetching: true,
      };
    }
    case FETCH_BET_HISTORY.SUCCESS: {
      return {
        ...state,
        fetching: false,
        error: null,
        betHistory: action.payload,
      };
    }
    case FETCH_BET_HISTORY.FAILURE: {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
