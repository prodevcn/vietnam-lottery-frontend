import { API_URL } from '../../constants/config';
import { AUTH, LOGOUT, SET_USER, REMOVE_USER } from '../../constants/actions';
import { CreateAxios } from "../../util/lib";

export const login = (userData, router) => async dispatch => {
    dispatch({type: AUTH.REQUEST});
    return CreateAxios().then(axios => 
        axios.post('/auth/login', userData)
            .then(async res => {
                if (res?.data?.message) {
                    dispatch({type: AUTH.FAILURE, payload: res.data.message});
                } else {
                    await localStorage.setItem('token', res.data.token);
                    await localStorage.setItem('user', JSON.stringify(res.data.user));
                    dispatch({type: SET_USER, payload: res.data.user});
                    dispatch({type: AUTH.SUCCESS});
                }
            })
            .catch(err => {
                if (err.response) {

                }
            })
    );
};

export const register = (userData, router) => dispatch => {
    dispatch({type: AUTH.REQUEST});
    return CreateAxios().then(axios => 
        axios.post('/auth/register', userData)
            .then(async res => {
                if (res?.data?.message) {
                    dispatch({type: AUTH.FAILURE, payload: res.data.message});
                } else {
                    await localStorage.setItem('token', res.data.token);
                    await localStorage.setItem('user', JSON.stringify(res.data.user));
                    dispatch({type: SET_USER, payload: res.data.user});
                    dispatch({type: AUTH.SUCCESS});
                }
            })
            .catch(err => {
                if (err.response) {
                    dispatch({
                        type: AUTH.FAILURE,
                        payload: err.response.data?.message,
                    });
                    setTimeout(() => {
                        dispatch({
                            type: AUTH.FAILURE,
                            payload: err.response.data?.message,
                        });
                    })
                }
            })
    );
}

export const checkAuth = () => async dispatch => {
    const token = await localStorage.getItem('token');
    const userPhrase = await localStorage.getItem('user');
    if (token && userPhrase) {
        dispatch({type: SET_USER, payload: {
            user: JSON.parse(userPhrase),
            token: token,
        }});
        dispatch({type: AUTH.SUCCESS});
    } else {
        dispatch({type:AUTH.FAILURE});
    }
    
};

export const logout = router => dispatch => {
    router.push("/");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({type: REMOVE_USER});
    dispatch({type: LOGOUT});
}