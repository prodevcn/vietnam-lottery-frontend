import {
    SET_BET_TABLE_INFOS,
    SET_GAME_RESULTS,
    SET_CURRENT_GAME_TYPE,
    SET_CURRENT_BET_TYPE,
    SET_CURRENT_DIGIT_TYPE,
    SET_BET_INFOS,
  } from "../../constants/actions";
  
  const INITIAL_STATE = {
    latestResults: [],
    currentGameType: {},
    currentBetType: {},
    currentDigitType: {},
    betInfos: [],
    betTableInfos: [],
    gameResults: [],
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_CURRENT_GAME_TYPE:
        return {
          ...state,
          currentGameType: action.payload,
        };
      case SET_CURRENT_BET_TYPE:
        return {
          ...state,
          currentBetType: action.payload,
        };
      case SET_CURRENT_DIGIT_TYPE:
        return {
          ...state,
          currentDigitType: action.payload,
        };
      case SET_BET_INFOS:
        return {
          ...state,
          betInfos: action.payload,
        };
      case SET_BET_TABLE_INFOS:
        return {
          ...state,
          betTableInfos: action.payload,
        };
      case SET_GAME_RESULTS:
        return {
          ...state,
          gameResults: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  