import {
    AUTH,
    LOGOUT,
    SET_USER,
    REMOVE_USER,
    SET_ONLY_USER,
  } from "../../constants/actions";
  import { CreateAxios } from "../../util/lib";
  
  export const login = (userData) => async (dispatch) => {
    dispatch({ type: AUTH.REQUEST });
    return CreateAxios().then((axios) =>
      axios
        .post("/auth/login", userData)
        .then(async (res) => {
          if (res && res.msg) {
            dispatch({ type: AUTH.FAILURE, payload: res.data.message });
          } else {
            await localStorage.setItem("token", res.data.token);
            await localStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch({ type: SET_USER, payload: res.data.user });
            dispatch({ type: AUTH.SUCCESS });
          }
        })
        .catch((err) => {
          console.error('[ERROR]:[LOGIN]', err);
          // dispatch({type: AUTH.FAILURE, payload: err});
        })
    );
  };
  
  export const register = (userData) => (dispatch) => {
    dispatch({ type: AUTH.REQUEST });
    return CreateAxios().then((axios) =>
      axios
        .post("/auth/register", userData)
        .then(async (res) => {
          if (res?.data?.message) {
            dispatch({ type: AUTH.FAILURE, payload: res.data.message });
          } else {
            await localStorage.setItem("token", res.data.token);
            await localStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch({ type: SET_USER, payload: res.data.user });
            dispatch({ type: AUTH.SUCCESS });
          }
        })
        .catch((err) => {
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
            });
          }
        })
    );
  };
  
  export const checkAuth = () => async (dispatch) => {
    const token = await localStorage.getItem("token");
    const userPhrase = await localStorage.getItem("user");
    if (token && userPhrase) {
      dispatch({
        type: SET_USER,
        payload: {
          user: JSON.parse(userPhrase),
          token,
        },
      });
      dispatch({ type: AUTH.SUCCESS });
      return true;
    }
    dispatch({ type: AUTH.FAILURE });
    return false;
  };
  
  export const logout = (router) => (dispatch) => {
    router.push("/");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: REMOVE_USER });
    dispatch({ type: LOGOUT });
  };
  
  export const getUserInfo = (userId) => (dispatch) =>
    CreateAxios().then((axios) =>
      axios
        .get(`/auth/get-user-info/${userId}`)
        .then(async (res) => {
          await localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({ type: SET_ONLY_USER, payload: res.data });
        })
        .catch((err) => {
          console.log("[ERROR]:[GET_USER_INFO]");
        })
    );
  