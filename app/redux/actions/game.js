import { CreateAxios } from '../../util/lib';

export const getGameLatestResult = () => dispatch => {
    return CreateAxios().then(axios => 
        axios.get('/game/get-latest-results')
            .then(res => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch(err => {
                console.log('[ERROR]:[FETCHING_RECENT_GAME_RESULT]', err);
            })
    )
};

export const getGameHistory = (gameType) => dispatch => {
    return CreateAxios().then(axios =>
        axios.get(`/game/get-all-results/${gameType}`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return {message: 'something went wrong'}
            })
        );
}

export const getNewGameInfo = (gameType) => dispatch => {
    return CreateAxios().then(axios =>
        axios.get(`/game/get-new-game-info/${gameType}`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return {errorMessage: 'Something went wrong, Server does not response'};
            })
        );
}


export const getLatestGameData = () => dispatch => {
    return CreateAxios().then(axios =>
        axios.get
    )
};

