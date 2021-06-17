import {FETCH_BET_HISTORY, SAVE_BET_INFO} from '../../constants/actions';

const initialState = {
    fetching: false,
    fetched: false,
    betHistory: [],
    betInfo: {},
    error: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_BET_HISTORY.REQUEST: {
            return {
                ...state,
                fetching: true,
                fetched: false
            };
        }
        case FETCH_BET_HISTORY.SUCCESS: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                betHistory: action.payload
            };
        }
        case FETCH_BET_HISTORY.FAILURE: {
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload
            };
        }
    }
    return state;
};

export default reducer;