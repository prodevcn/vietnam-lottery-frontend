/* eslint-disable no-async-promise-executor */
import client from 'axios';
import {API_URL} from '../constants/config';

const check = (val = 0) => {
    if (val.toString().length === 1) return `0${val}`;
    return val;
};

export const setDate = (date) => {
    const new_date = new Date(date);
    const year = new_date.getFullYear();
    const month = new_date.getMonth() + 1;
    const day = new_date.getDate();
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
export const formatValue = (value) => {
    if (!value) return "";
    const pattern = /(\d)(?=(\d\d\d)+(?!\d))/g; // Separate variable every for 3 digits with comma
    return value.replace(pattern, "$1,");
  };

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
                    console.log(error);
                }
            );

            axios.interceptors.response.use(
                response => {
                  if (!response.data || typeof response.data === 'string') {
                    // throw {boundaryId: 'fetchResponse', details: response};
                  } else {
                    return response;
                  }
                },
                error => {
                  if (error.response && error.response.status === 401) {
                    console.log('[ERROR]:[CREATE_AXIOS]');
                  }
                }
              );
            resolve(axios);
        });
    });



