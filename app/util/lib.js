import client from 'axios';
import {API_URL} from '../constants/config';

const check = (val = 0) => {
    if (val.toString().length === 1) return `0${val}`;
    return val;
};

export const setDate = (date) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${check(month)}-${check(day)}-${year}`;
};


/** api call */
const getAuthorizationHeader = () => 
    new Promise(async resolve => {
        const token = await localStorage.getItem('token');
        if (token) {
            resolve(token);
        } else {
            resolve(null);
        }
    });

export const CreateAxios = () =>
    new Promise(resolve => {
        getAuthorizationHeader().then(async authHeader => {
            const axios = client.create({
                baseURL: API_URL,
                validateStatus: status => status >= 200 && status < 300,
                headers: {'Content-Type': 'application/json'},
                timeout: 1000 * 5,
            });

            axios.interceptors.request.use(
                config => {
                    if (authHeader) {
                        config.headers.Authorization = authHeader;
                    }
                    return config;
                },
                error => {
                    throw {boundaryId: 'API_REQUEST', details: error};
                }
            );

            axios.interceptors.response.use(
                response => {
                  console.log(response);
                  if (!response.data || typeof response.data === 'string') {
                    throw {boundaryId: 'fetchResponse', details: response};
                  } else {
                    return response;
                  }
                },
                error => {
                  if (err.response && error.response.status === 401) {
                    console.log('=============');
                  }
                  // if (error.response ? error.response.status === 401 : false) {
                  //   return;
                  // }
                  // if (
                  //   !error.response
                  //   || !error.response.status
                  //   || !(error.response.status >= 400 && error.response.status <= 403)
                  // )
                  // throw {boundaryId: 'fetchResponse', details: error};
                }
              );
            resolve(axios);
        });
    });



