import axios from "axios";
import { Cookies } from "react-cookie";

import { API_URL } from '../../constants/config';
import { AUTH, UN_AUTH } from '../../constants/actions';
import setAuthToken from "../../util/setAuthToken";

const cookies = new Cookies();

export const login = (userData, router) => dispatch => {
    return axios.post(`${API_URL}/auth/login`, userData)
        .then(res => {
            if (res.status >= 400) {
                return res.data;
            } else {
                cookies.set('token', res.data.token);
                cookies.set('user', res.data.user);
                setAuthToken(res.data.token);
                dispatch({ type: AUTH.SUCCESS, payload: '' });
                router.back();
            }
        })
        .catch(err => {
            return {errorMessage: 'You have entered  incorrect Email / Password'}
        });
};

export const register = (userData, router) => dispatch => {
    return axios.post(`${API_URL}/auth/register`, userData)
        .then(res => {
            if (res.data.success === true) {
                console.log(res.data);
                cookies.set('token', res.data.token);
                cookies.set('user', res.data.user);
                setAuthToken(res.data.token)
                dispatch({ type: AUTH.SUCCESS, payload: '' });
            }
            return res;
        })
        .catch(err => {
            return { errorMessage: 'register failure' };
        })
}

export const logout = () => dispatch => {
    cookies.remove('user');
    cookies.remove('token');
    return dispatch({ type: UN_AUTH.SUCCESS, payload: '' });
}