/* eslint-disable no-async-promise-executor */
import client from "axios";
import { API_URL } from "../constants/config";
import REGEX_PHRASES from "../constants/regex";

const check = (val = 0) => {
  if (val.toString().length === 1) return `0${val}`;
  return val;
};

export const formatDate = (date) => {
  const new_date = new Date(date);
  const year = new_date.getFullYear();
  const month = new_date.getMonth() + 1;
  const day = new_date.getDate();
  return `${check(month)}-${check(day)}-${year}`;
};

export const createDate = (date) => {
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  const identity = date.substr(11, 2) + date.substr(14, 2);
  return day + month + year + '-' + identity;
}

export const formatTimerNumber = (value) => {
  if (value < 0) return '...';
  if (value < 10) return '0' + value;
  if (value > 9) return value;
}



/** format number for balance each 3 digits comma */
export const formatValue = (value) => {
  if (!value) return "";
  const pattern = /(\d)(?=(\d\d\d)+(?!\d))/g; // Separate variable every for 3 digits with comma
  return value.replace(pattern, "$1,");
};

/** create  axios instance */

/** api call */
const getAuthorizationHeader = () =>
  new Promise(async (resolve) => {
    const token = await localStorage.getItem("token");
    if (token) {
      resolve(token);
    } else {
      resolve(null);
    }
  });

/** create axios instance */
export const CreateAxios = () =>
  new Promise((resolve) => {
    getAuthorizationHeader().then(async (authHeader) => {
      const axios = client.create({
        baseURL: API_URL,
        validateStatus: (status) => status >= 200 && status < 300,
        headers: { 
          "Content-Type": "application/json",
        },
        timeout: 1000 * 5,
      });

      axios.interceptors.request.use(
        (config) => {
          if (authHeader) {
            config.headers.Authorization = 'JWT ' + authHeader;
          }
          return config
        },
        (error) => {
          console.log(error);
        }
      );

      axios.interceptors.response.use(
        (response) => 
           response
          // if (!response.data || typeof response.data === "string") {
          //   // throw {boundaryId: 'fetchResponse', details: response};
          // } else {
          //   return response;
          // }
          // console.log('[SUCCESS]:[RESPONSE]:[AXIOS_MIDDLEWARE]', response);
        ,
        (error) => {
          if(error.response.status === 401)
            return {status: false, msg: "not authenticated"}  
          // if (error.response && error.response.status === 401) {
          //   console.log("[ERROR]:[CREATE_AXIOS]");
          // }
          console.log('[FAILURE]:[ERROR]:[AXIOS_MIDDLEWARE]', error);
        }
      );
      resolve(axios);
    });
  });


export const validateScript = (script, betType, digitType) => {
  if (script[script.length - 1] !== ';')
    return false;

  let pattern;  
  if (betType === 'mega' && (digitType === 'slide8' || digitType === 'slide10'))
    pattern = new RegExp(REGEX_PHRASES.slide5);
  else 
    pattern = new RegExp(REGEX_PHRASES[digitType]);
  const phrases = script.split(';');
  phrases.pop();
  for (const phrase of phrases) {
    if (!pattern.test(phrase))
      return false;
    if (betType === "mega") {
      if (Number(phrase) > 45 || Number(phrase) < 1)
        return false;
    }
  }
  return true;
};

export const getCombinations = (arr, selectNumber) => {
  const results = [];
  if (selectNumber === 1) return arr.map((value) => [value]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });

  return results;
};
