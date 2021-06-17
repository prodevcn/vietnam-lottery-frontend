import {FETCH_BET_HISTORY} from '../../constants/actions';

const fetchRequest = () => {
    return {
        type: FETCH_BET_HISTORY.REQUEST
    };
};

const fetchSuccess = (data) => {
    return {
        type: FETCH_BET_HISTORY.SUCCESS,
        payload: data
    }
}

const fetchFailure = (error) => {
    return {
        type: FETCH_BET_HISTORY.FAILURE,
        payload: error
    }
}

export function fetchBetHistories() {
    return dispatch => {
        dispatch(fetchRequest());
    }
};