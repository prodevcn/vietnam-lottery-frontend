import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import io from "socket.io-client";
import Block from "@material-ui/icons/Block";
import Speed from "@material-ui/icons/Speed";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutline";
import { Grid, Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { formatValue, validateScript, rateConvertor } from "../../app/util/lib";
import Layout from "../../app/layouts/Layout";
import RequireAuth from "../../app/layouts/RequireAuth";
import InputWithButton from "../../app/components/InputWithButton";
import Button from "../../app/components/Button";
import JackPotPanel from "../../app/containers/BetTypes/Jackpot";
import { 
  setCurrentGameType, 
  setCurrentBetType, 
  setCurrentDigitType, 
  saveBetInfos, 
  betGame,
  getGameLatestResult,
  getNewGameInfo,
  getGameHistoriesForGameType, 
} from "../../app/redux/actions/game";
import { getUserInfo } from "../../app/redux/actions/auth";
import { API_URL } from "../../app/constants/config";
import BET_RATES from "../../app/constants/betRates";

const socket = io.connect(API_URL);

const JackPot = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {currentBetType, betInfos, currentGameType, currentDigitType} = useSelector(state => state.game);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const BET_TYPES = [
    {
      value: "jackpot",
      label: t("bet_types.backpack"),
    },
  ];
  /** state for bet details */
  const { user, balance } = useSelector((state) => state.user);
  const [script, setScript] = useState("");
  const [allBetAmount, setAllBetAmount] = useState(0);
  const [countOfNumbers, setCount] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [multiple, setMultiple] = useState(1);
  const [betNumbers, setBetNumbers] = useState("");
  const [units, setUnits] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [tens, setTens] = useState([false, false, false, false, false, false, false, false, false, false]);

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
    setUnits([false, false, false, false, false, false, false, false, false, false]);
    setTens([false, false, false, false, false, false, false, false, false, false]);
    setScript("");
    setBetAmount(0);
    setCount(0);
    setMultiple(1);
  };
  const updateDigits = (digit, index) => {
    switch (digit) {
      case "unit":
        setUnits((prevUnits) => {
          const list = prevUnits.map((e, i) => {
            if (i === index) return !e;
            return e;
          });
          return list;
        });
        break;
      case "ten":
        setTens((prevTens) => {
          const list = prevTens.map((e, i) => {
            if (i === index) return !e;
            return e;
          });
          return list;
        });
        break;
      default:
        break;
    }
  };

  const setDigitAll = (digit) => {
    switch (digit) {
      case "unit":
        setUnits([true, true, true, true, true, true, true, true, true, true]);
        break;
      case "ten":
        setTens([true, true, true, true, true, true, true, true, true, true]);
        break;
      default:
        break;
    }
  };
  const setFirstHalf = digit => {
    switch (digit) {
      case "unit":
        setUnits([true, true, true, true, true, false, false, false, false, false]);
        break;
      case "ten":
        setTens([true, true, true, true, true, false, false, false, false, false]);
        break;
      default:
        break;
    }
  };

  const setLastHalf = digit => {
    switch (digit) {
      case "unit":
        setUnits([false, false, false, false, false, true, true, true, true, true]);
        break;
      case "ten":
        setTens([false, false, false, false, false, true, true, true, true, true]);
        break;
      default:
        break;
    }
  };

  const clearDigitAll = (digit) => {
    switch (digit) {
      case "unit":
        setUnits([false, false, false, false, false, false, false, false, false, false]);
        break;
      case "ten":
        setTens([false, false, false, false, false, false, false, false, false, false]);
        break;
      default:
        break;
    }
  };

  const checkBetInfo = () => {
    let unit_count = 0;
    const selectedUnit = [];
    let ten_count = 0;
    const selectedTen = [];
    for (let index = 0; index < 10; index += 1) {
      if (units[index] === true) {
        unit_count += 1;
        selectedUnit.push(index.toString());
      }
    }
    for (let index = 0; index < 10; index += 1) {
      if (tens[index] === true) {
        ten_count += 1;
        selectedTen.push(index.toString());
      }
    }
    let phrase = "";
    let amount = 0;
    if (script !== "") {
      if(!validateScript(script, currentBetType.value, currentDigitType.value))
        return {status: false, phrase: null};
      setBetNumbers(script);
      const counts = script.split(";").length - 1;
      amount = BET_RATES.lot27.jackpot * counts * multiple;
      setBetAmount(amount);
      setCount(counts);
      return { status: true, phrase: script };
    }
    if (unit_count === 0 || ten_count === 0) {
      return { status: false, phrase: null };
    }
    const formattedNumbers = selectedUnit.map((index_unit) => selectedTen.map((index_ten) => `${index_ten}${index_unit};`));
    for (const item_1 of formattedNumbers) {
      for (const item_2 of item_1) {
        phrase = phrase.concat(item_2);
      }
    }
    amount = BET_RATES.lot27.jackpot * (phrase.split(";").length - 1) * multiple;
    setBetNumbers(phrase);
    setBetAmount(amount);
    setCount(phrase.split(";").length - 1);
    return { status: true, phrase };
  }

  const onQuickBet = () => {
    const savedOrders = betInfos;
    const checkResult = checkBetInfo();
    if (!checkResult.status || (betAmount / 22840).toFixed(2) > balance) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } else {
      savedOrders.push({
        type: 'lot27',
        userId: user.userId,
        gameType: currentGameType.value,
        betType: currentBetType.value,
        digitType: currentDigitType.value,
        multiple,
        betAmount,
        numbers: betNumbers,
      });
      dispatch(betGame(savedOrders));
      clearAll();
      setTimeout(() => {
        dispatch(getUserInfo(user.userId));
      }, 2000);
    }
  };

  const onMoreBet = () => {
    const checkResult = checkBetInfo();
    if (!checkResult.status || (betAmount / 22840).toFixed(2) > balance) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } else {
      const savedInfos = betInfos;
      savedInfos.push({
        type: 'lot27',
        userId: user.userId,
        gameType: currentGameType.value,
        betType: currentBetType.value,
        digitType: currentDigitType.value,
        multiple,
        betAmount,
        numbers: betNumbers,
      });
      setAllBetAmount((prev) => prev + betAmount);
      dispatch(saveBetInfos(betInfos));
      clearAll();
    }
  };

  /** socket process */
  const getNewResult = () => {
    dispatch(getGameLatestResult('northern'))
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
    dispatch(getNewGameInfo('northern'))
      .then((res) => {
        setGameInfo(res);
      })
      .catch((err) => {
        console.error('[ERROR]:[GET_NEW_GAME_INFO]', err);
      });
  };

  const handleNewGame = useCallback((game) => {
    getNewGame();
    dispatch(getUserInfo(user.userId));
    dispatch(getGameHistoriesForGameType('northern'));
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
    socket.emit("subscribe_timer", 'northern');
  }, []);
  useEffect(() => {
    dispatch(
      setCurrentGameType({
        value: 'northern',
        label: t("game_types.northern.northern")
      })
    );
    dispatch(setCurrentBetType({
      label: t("game_types.northern.jackpot"),
      value: 'jackpot'
    }));
    dispatch(setCurrentDigitType({
      label: t("game_types.northern.jackpot"),
      value: 'jackpot'
    }));
  }, [t]);

  useEffect(() => {
    checkBetInfo();
  }, [units, tens, script]);

  useEffect(() => {
    if (multiple > 1000000) {
      setMultiple(1000000);
    }
    checkBetInfo();
  }, [multiple]);

  /** handle socket process */
  useEffect(() => {
    dispatch(
      setCurrentGameType({
        value: 'northern',
        label: t("game_types.northern.northern")
      })
    );
    dispatch(setCurrentBetType({
      label: t("game_types.northern.jackpot"),
      value: 'jackpot'
    }));
    dispatch(setCurrentDigitType({
      label: t("game_types.northern.jackpot"),
      value: 'jackpot'
    }));
    getNewResult();
    getNewGame();
    socket.emit("subscribe_timer", 'northern');
    socket.on("START_NEW_GAME", handleNewGame);
    socket.on("TIMER", handleTimer);
    return () => {
      socket.removeAllListeners("TIMER");
      socket.removeAllListeners("START_NEW_GAME");
    }
  }, []);

  return (
    <Layout
      gameType="northern"
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
          <div className="bread_crumb_item">
            <p className="active_text">{t("game_types.northern.jackpot")}</p>
          </div>
        </div>
        <div>
          <JackPotPanel 
            script={script}
            setScript={(value) => setScript(value)}
            units={units}
            tens={tens}
            clearAll={() => {
              clearAll();
            }}
            updateDigits={(digit, index) => {
              updateDigits(digit, index);
            }}
            setDigitAll={(digit) => {
              setDigitAll(digit);
            }}
            clearDigitAll={(digit) => {
              clearDigitAll(digit);
            }}
            setFirstHalf={(digit) => {
              setFirstHalf(digit);
            }}
            setLastHalf={(digit) => {
              setLastHalf(digit);
            }}
            key="score"
          />
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
                    {t("payout")} {rateConvertor(betAmount)} {t("vnd")}
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
                  onClick={() => {onQuickBet()}}
                />
                <Button
                  title={t("buttons.more_bet")}
                  icon={<AddCircleOutlined className="icon" style={{ color: "white" }} />}
                  onClick={() => {onMoreBet()}}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Dialog fullScreen={fullScreen} open={open} aria-labelledby="responsive-dialog-title">
        <DialogContent className="game_selection_box">
          <DialogContent>
            <div style={{ display: "flex" }}>
              <p className="date_text">{t("bet_err_msg")}</p>
            </div>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default RequireAuth(JackPot);
