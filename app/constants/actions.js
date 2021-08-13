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
export const SET_ONLY_USER = 'SET_ONLY_USER';

/** game actions */
export const SET_CURRENT_GAME_TYPE = 'SET_CURRENT_GAME';
export const SET_CURRENT_BET_TYPE = 'SET_CURRENT_BET_TYPE';
export const SET_CURRENT_DIGIT_TYPE = 'SET_CURRENT_DIGIT_TYPE';

export const FETCH_BET_HISTORY = createRequestTypes('FETCH_BET_HISTORY');
export const SAVE_BET_INFO = createRequestTypes('SAVE_BET_INFO');
export const FETCH_GAME_HISTORY = createRequestTypes('FETCH_GAME_HISTORY');
export const SET_BET_TABLE_INFOS = 'SET_BET_TABLE_INFOS';
export const SET_BET_INFOS = 'SET_BET_INFOS';
export const SET_GAME_RESULTS = 'SET_GAME_RESULTS';