const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
    const requestType = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => {
        requestType[type] = `${base}_${type}`;
    });
    return requestType;
}

/** auth actions */
export const AUTH = createRequestTypes('AUTH');
export const LOGOUT = 'LOGOUT';

/** user actions */
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

/** game actions */
export const FETCH_BET_HISTORY = createRequestTypes('FETCH_BET_HISTORY');
export const SAVE_BET_INFO = createRequestTypes('SAVE_BET_INFO');
export const FETCH_GAME_HISTORY = createRequestTypes('FETCH_GAME_HISTORY');