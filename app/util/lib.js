import client from 'axios';
import {API_URL} from '../constants/config';

const getAuthorizationHeader = () => {
    new Promise(resolve => {
        const accessToken = await AsyncStorage.getItem('token');
        
    });
}

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

export const CreateAxios = () => {
    now Promise(resolve => {
    

    })
}



