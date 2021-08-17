import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
/** material ui */
import { Grid } from "@material-ui/core";
import { Star, Timer } from "@material-ui/icons";
/** common lib */
// import io from "socket.io-client";
import _ from "lodash";
/** utils & constants */
import { getUserInfo } from "../../redux/actions/auth";
// import { getGameLatestResult, getNewGameInfo, getGameHistoriesForGameType } from "../../redux/actions/game";
import { setDate } from "../../util/lib";
// import { API_URL } from "../../constants/config";

// const socket = io.connect(API_URL);

const ResultBoard = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const { currentGameType, currentBetType, currentDigitType } = useSelector((state) => state.game);
  // const [result, setResult] = useState({});
  // const [gameInfo, setGameInfo] = useState({});
  // const [duration, setDuration] = useState({
    // hours: "...",
    // minutes: "...",
    // seconds: "...",
  // });
  
  // const getNewResult = () => {
  //   dispatch(getGameLatestResult(currentGameType.value))
  //     .then((res) => {
  //       if (res) {
  //         setResult(res);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('[ERROR]:[GET_LATEST_GAME_RESULT]', err);
  //     });
  // };

  // const getNewGame = () => {
  //   dispatch(getNewGameInfo(currentGameType.value))
  //     .then((res) => {
  //       setGameInfo(res);
  //     })
  //     .catch((err) => {
  //       console.error('[ERROR]:[GET_NEW_GAME_INFO]', err);
  //     });
  // };

  // const handleNewGame = useCallback((game) => {
  //   if (game === currentGameType.value) {
  //     getNewGame();
  //     dispatch(getUserInfo(user._id));
  //     dispatch(getGameHistoriesForGameType(currentGameType.value));
  //     getNewResult();
  //     console.log('[START]:[NEW_GAME]');
  //   }
  // });

  // const handleTimer = useCallback((info) => {
  //   console.log(info);
  //   if (info.game === currentGameType.value) {
  //     setDuration({
  //       hours: Math.floor((info.duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  //       minutes: Math.floor((info.duration % (1000 * 60 * 60)) / (1000 * 60)),
  //       seconds: Math.floor((info.duration % (1000 * 60)) / 1000),
  //     });
  //   }
  // });

  // const stopTimer = () => {
  //   socket.removeAllListeners("timer");
  //   socket.removeAllListeners("new game start");
  // }
  
  // useEffect(() => {
  //   getNewResult();
  //   getNewGame();
  //   socket.emit("subscribe_timer", currentGameType.value);
  //   socket.on("new game start", handleNewGame);
  //   socket.on("timer", handleTimer);
  //   return () => {
  //     socket.removeAllListeners("timer");
  //     socket.removeAllListeners("new game start");
  //   }
  // }, []);
  useEffect(() => {
    console.log('+++++', props.result);
  }, []);

  return (
    <div className="__result_board_main">
      <Grid container spacing={1}>
        <Grid item lg={4} md={4} sm={12} xs={12} className="title__area">
          <p className="game__title">{currentGameType.label}</p>
          <p className="betting__type">
            {currentBetType.label} {">"} {currentDigitType.label}
          </p>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12} className="timer__area">
          <div className="item_row">
            <Timer style={{ color: "white" }} />
            <p style={{ color: "white" }}>{t("result_board.bet_time")}</p>
          </div>
          <div className="item_row">
            <p style={{ color: "white" }}>{t("result_board.lottery_draw")}&nbsp;</p>
            <p style={{ color: "rgb(255, 136, 1)" }}>{setDate(props.gameInfo?.endTime)}</p>
          </div>
          <div className="number_area" style={{ marginTop: 15 }}>
            <div className="duration__circle" key="DURATION_HOURS">
             <h6 style={{ color: "white" }}>{props.duration.hours < 0 ? "..." : props.duration.hours}</h6>
            </div>
            <h6 className="date_text" style={{ padding: 0, display: "flex", alignItems: "center" }}>
              :
            </h6>
            <div className="duration__circle" key="DURATION_MINUTES">
              <h6 style={{ color: "white" }}>{props.duration.minutes < 0 ? "..." : props.duration.minutes}</h6>
            </div>
            <h6 className="date_text" style={{ padding: 0, display: "flex", alignItems: "center" }}>
              :
            </h6>
            <div className="duration__circle" key="DURATION_SECONDS">
              <h6 style={{ color: "white" }}>{props.duration.seconds < 0 ? "..." : props.duration.seconds}</h6>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12} className="result_area">
          <div className="item_row">
            <Star style={{ color: "white" }} />
            <p style={{ color: "white" }}>{t("result_board.lottery_result")}</p>
          </div>
          <p style={{ color: "rgb(255, 136, 1)", alignItems: "center" }}>{setDate(props.result.endTime)}</p>
          {
            (
              currentGameType.value === 'northern' || 
              currentGameType.value === 'hanoi' ||
              currentGameType.value === 'hochiminh' ||
              currentGameType.value === 'saigon'
            ) && (
              <div className="number_area">
                {props.result.numbers
                  ? props.result.numbers.redAward.split("").map((item, index) => (
                      <div className="number__circle" key={`RESULT_${index}`}>
                        <h6 style={{ color: "white" }}>{item}</h6>
                      </div>
                    ))
                  : _.range(0, 5).map((item, index) => (
                      <div className="number__circle" key={`RESULT_${index}`}>
                        <h6 style={{ color: "white" }}>_</h6>
                      </div>
                    ))}
              </div>
            )
          }
          {
            currentGameType.value === 'mega' && (
              <div className="number_area">
                {props.result.numbers ? (
                  Object.keys(props.result.numbers).map((item, index) =>(
                    <div className="number__circle_6" key={`RESULT_MEGA_${index}`}>
                        <h6 style={{ color: "white" }}>{props.result.numbers[item]}</h6>
                      </div>
                  ))
                ):(
                  _.range(0, 6).map((item, index) => (
                      <div className="number__circle_6" key={`RESULT_${index}`}>
                        <h6 style={{ color: "white" }}>_</h6>
                      </div>
                    ))
                )}
              </div>
            )
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default ResultBoard;
