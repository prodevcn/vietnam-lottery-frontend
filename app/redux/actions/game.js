import axios from 'axios';
import { API_URL } from '../../constants/config';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getGameResult = () => dispatch => {
    return axios.get(`${API_URL}/game/get-results`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return {errorMessage: 'Something went wrong, Server does not response'};
        });
};

export const getGameHistory = (gameType) => dispatch => {
    const config = {
        headers: { Authorization: cookies.get('token') }
    };
    return axios.get(`${API_URL}/game/get-history/${gameType}`, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return {errorMessage: 'Something went wrong, Server does not response'};
        });
}

export const getNewGameInfo = (gameType) => dispatch => {
    const config = {
        headers: { Authorization: cookies.get('token') }
    };
    return axios.get(`${API_URL}/game/get-new-game/${gameType}`, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return {errorMessage: 'Something went wrong, Server does not response'};
        });
}

