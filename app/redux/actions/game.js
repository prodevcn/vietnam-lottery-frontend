import { CreateAxios } from "../../util/lib";
import {
  SET_CURRENT_GAME_TYPE,
  SET_CURRENT_BET_TYPE,
  SET_CURRENT_DIGIT_TYPE,
  SET_GAME_RESULTS,
  SET_BET_INFOS,
  SET_BET_TABLE_INFOS,
  
} from "../../constants/actions";
import WIN_RATES from "../../constants/winRates";

const createData = (
  no,
  betName,
  numberOfBets,
  totalBet,
  multiple,
  stakes,
  moneyWon1Time
) => ({ no, betName, numberOfBets, totalBet, multiple, stakes, moneyWon1Time });

export const getGameLatestResult = (gameType) => (dispatch) =>
  CreateAxios().then((axios) =>
    axios
      .get(`/game/get-latest-result/${gameType}`)
      .then((res) => {
        if (res && res.data) {
          return res.data;
        }
      })
      .catch((err) => {
        console.log("[ERROR]:[FETCHING_RECENT_GAME_RESULT]", err);
      })
  );

export const getGameAllLatestResults = () => dispatch => 
  CreateAxios().then((axios) =>
    axios
      .get("/game/get-all-latest-results")
      .then((res) => {
        if (res && res.data) {
          return res?.data;
        }
      })
      .catch((err) => {
        console.log("[ERROR]:[FETCHING_RECENT_GAME_RESULT]", err);
      })
  )

export const getGameHistory = (gameType) => (dispatch) =>
  CreateAxios().then((axios) =>
    axios
      .get(`/game/get-all-results/${gameType}`)
      .then((res) => {
        dispatch({ type: SET_GAME_RESULTS, payload: res.data });
        return res.data;
      })
      .catch((err) => ({ message: "something went wrong" }))
  );

export const getGameAllHistory = (userId) => (dispatch) =>
  CreateAxios().then((axios) =>
    axios
      .get(`/game/get-all-history/${userId}`)
      .then((res) => res.data)
      .catch((err) => ({ message: "something went wrong" }))
  );

export const getAllOrders = (userId) => (dispatch) =>
  CreateAxios().then((axios) =>
    axios
      .get(`/game/get-all-order/${userId}`)
      .then((res) => res.data)
      .catch((err) => ({ message: "something went wrong" }))
  );

export const getNewGameInfo = (gameType) => (dispatch) =>
  CreateAxios().then((axios) =>
    axios
      .get(`/game/get-new-game-info/${gameType}`)
      .then((res) => res.data)
      .catch((err) => ({
        errorMessage: "Something went wrong, Server does not response",
      }))
  );

export const setCurrentGameType = (gameType) => (dispatch) => {
  dispatch({ type: SET_CURRENT_GAME_TYPE, payload: gameType });
}

export const setCurrentBetType = (betType) => (dispatch) =>
  dispatch({ type: SET_CURRENT_BET_TYPE, payload: betType });

export const setCurrentDigitType = (digitType) => (dispatch) =>
  dispatch({ type: SET_CURRENT_DIGIT_TYPE, payload: digitType });

export const saveBetInfos = (infos) => (dispatch) => {
  if (infos.length === 0) {
    dispatch({ type: SET_BET_TABLE_INFOS, payload: [] });
  } else {
    const data = infos.map((item, index) =>
      createData(
        index + 1,
        `${item.betType}-${item.digitType}`,
        item.numbers.substr(0, 20) + "...",
        item.numbers.split(";").length - 1,
        item.multiple,
        item.betAmount,
        WIN_RATES[item.gameType][item.betType][item.digitType]
      )
    );
    dispatch({ type: SET_BET_TABLE_INFOS, payload: data });
  }
  dispatch({ type: SET_BET_INFOS, payload: infos });
};

export const betGame = (infos) => (dispatch) =>
  CreateAxios().then((axios) =>
    axios
      .post("/game/bet/save", infos)
      .then((res) => {
        if (res.data) {
          dispatch({ type: SET_BET_INFOS, payload: [] });
          dispatch({ type: SET_BET_TABLE_INFOS, payload: [] });
          return res.data;
        }
      })
      .catch((err) => {
        console.log("[ERROR]:[SET_BET_GAME]", err);
      })
  );
