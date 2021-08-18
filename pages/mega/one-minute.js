import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import io from "socket.io-client";
/** material */
import { Block, Speed, AddCircleOutline } from "@material-ui/icons";
import { Grid, Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
/** utils & constants */
import { formatValue, validateScript } from "../../app/util/lib";
import BET_RATES from "../../app/constants/betRates";
import {
  getGameLatestResult,
  getNewGameInfo,
  getGameHistoriesForGameType,
  setCurrentGameType,
  setCurrentBetType,
  saveBetInfos,
  betGame,
} from "../../app/redux/actions/game";
import { getUserInfo } from "../../app/redux/actions/auth";
/** custom components */
import Layout from "../../app/layouts/Layout";
import RequireAuth from "../../app/layouts/RequireAuth";
import InputWithButton from "../../app/components/InputWithButton";
import Mega from "../../app/containers/BetTypes/Mega";
import Button from "../../app/components/Button";
import { API_URL } from "../../app/constants/config";

import Slide from "../../app/containers/BetTypes/Slide";
import Normal from "../../app/containers/BetTypes/Normal";
import Multiple from "../../app/containers/BetTypes/Multiple";
import Select from "../../app/containers/BetTypes/Select";

const socket = io.connect(API_URL);

const OneMinute = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const { betInfos, currentGameType, currentBetType, currentDigitType } =
    useSelector((state) => state.game);
  const [open, setOpen] = useState(false);
  const [selectedBetTypeIndex, setBetTypeIndex] = useState(0);
  const BET_TYPES = [
    {
      value: "normal",
      label: t("bet_types.normal"),
    },
    {
      value: "multiple",
      label: t("bet_types.multiple"),
    },
    {
      value: "slide",
      label: t("bet_types.slide")
    },
    {
      value: "select",
      label: t("bet_types.select")
    }
  ];

  /** states for bet details */
  const [script, setScript] = useState('');
  const [allBetAmount, setAllBetAmount] = useState(0);
  const [countOfNumbers, setCount] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [multiple, setMultiple] = useState(1);
  const [betNumbers, setNumbers] = useState('');

  /** */
  const [result, setResult] = useState({});
  const [gameInfo, setGameInfo] = useState({});
  const [duration, setDuration] = useState({
    hours: "...",
    minutes: "...",
    seconds: "...",
  });
  /** */

  const clearAll = () => {
    setScript('');
    setBetAmount(0);
    setCount(0);
    setMultiple(1);
  };

  /** socket process */
  const getNewResult = () => {
    dispatch(getGameLatestResult('mega'))
      .then((res) => {
        if (res) {
          setResult(res);
        }
      })
      .catch((err) => {
        console.error('[ERROR]:[GET_LATEST_GAME_RESULT]', err);
      });
  };

  const getNewGame = () => {
    dispatch(getNewGameInfo('mega'))
      .then((res) => {
        setGameInfo(res);
      })
      .catch((err) => {
        console.error('[ERROR]:[GET_NEW_GAME_INFO]', err);
      });
  };

  const handleNewGame = useCallback((game) => {
    getNewGame();
    dispatch(getUserInfo(user._id));
    dispatch(getGameHistoriesForGameType('mega'));
    getNewResult();
    console.log('[START]:[NEW_GAME]');
  });

  const handleTimer = useCallback((info) => {
    setDuration({
      hours: Math.floor((info.duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((info.duration % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((info.duration % (1000 * 60)) / 1000),
    });
  });

  /** */

  useMemo(() => {
    socket.emit("subscribe_timer", 'mega');
  }, []);

  useEffect(() => {
    if (multiple > 1000000) {
      setMultiple(1000000);
    }
    // checkBetInfo(); TODO: 
  }, [multiple]);

  /** handle socket process */
  useEffect(() => {
    dispatch(
      setCurrentGameType({
        label: t("game_types.mega.caption"),
        value: 'mega'
      })
    )
    dispatch(setCurrentBetType(BET_TYPES[0]));
    getNewResult();
    getNewGame();
    socket.on("new game start", handleNewGame);
    socket.on("timer", handleTimer);
    return () => {
      socket.removeAllListeners("timer");
      socket.removeAllListeners("new game start");
    }
  }, []);

  return (
    <Layout
      gameType="mega"
      gameInfo={gameInfo}
      duration={duration}
      result={result}
      allBetAmount={allBetAmount}
      clearAllAmount={() => {
        setAllBetAmount(0);
      }}
      clearAll={() => {
        clearAll();
      }}
    >
      <div>
        <div className="bread_crumb">
          {BET_TYPES.map((item, index) => (
            <div
              className="bread_crumb_item"
              onClick={() => {
                setBetTypeIndex(index);
                dispatch(setCurrentBetType(item));
              }}
              key={`BREAD_CRUMB_KEY_${index}`}
            >
              <p className={selectedBetTypeIndex === index ? "active_text" : "date_text"}>{item.label}</p>
            </div>
          ))}
        </div>
        {[
          selectedBetTypeIndex === 0 && (
            <Normal 
              script={script}
              setScript={(value) => setScript(value)}
              clearAll={() => {
                clearAll();
              }}
              key="slide"
            />
          ),
          selectedBetTypeIndex === 1 && (
            <Multiple 
              script={script}
              setScript={(value) => setScript(value)}
              clearAll={() => {
                clearAll();
              }}
              key="select"
            />
          ),
          selectedBetTypeIndex === 2 && (
            <Slide 
              script={script}
              setScript={(value) => setScript(value)}
              clearAll={() => {
                clearAll();
              }}
              key="normal"
            />
          ),
          selectedBetTypeIndex === 3 && (
            <Select 
              script={script}
              setScript={(value) => setScript(value)}
              clearAll={() => {
                clearAll();
              }}
              key="normal"
            />
          ),
        ]}
        <div className="bet_button_area">
            <Grid container spacing={0}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <div className="_number__area">
                  <p style={{ marginRight: "1rem" }}>{t("multiple")}</p>
                  <InputWithButton
                    onChange={(e) => {
                      setMultiple(e);
                    }}
                    value={multiple}
                  />
                </div>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <div className="_info__area">
                  <p>
                    {t("select")} {countOfNumbers} {t("numbers")}
                  </p>
                  <p>
                    {t("payout")} {formatValue(betAmount.toString())} {t("vnd")}
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ display: "flex", marginTop: "1rem", justifyContent: "space-around", alignItems: "center" }}
              >
                <Button
                  title={t("buttons.reset")}
                  onClick={() => {
                    clearAll();
                  }}
                  type="outlined"
                  icon={<Block className="icon" />}
                  innerStyle={{ backgroundColor: "#131313f0" }}
                />
                <Button
                  title={t("buttons.quick_bet")}
                  icon={<Speed className="icon" style={{ color: "white" }} />}
                  onClick={() => {
                    // onQuickBet();
                  }}
                />
                <Button
                  title={t("buttons.more_bet")}
                  icon={<AddCircleOutline className="icon" style={{ color: "white" }} />}
                  onClick={() => {
                    // onMoreBet();
                  }}
                />
              </Grid>
            </Grid>
          </div>
        
      </div>
    </Layout>
  );
};

export default RequireAuth(OneMinute);
