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

export const AUTH = createRequestTypes('AUTH');
export const UN_AUTH = createRequestTypes('UN_AUTH');

export const FETCH_BET_HISTORY = createRequestTypes('FETCH_BET_HISTORY');
export const SAVE_BET_INFO = createRequestTypes('SAVE_BET_INFO');

export const FETCH_GAME_HISTORY = createRequestTypes('FETCH_GAME_HISTORY');