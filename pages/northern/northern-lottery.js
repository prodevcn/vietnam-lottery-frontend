import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
/** material */
import { Block, Speed, AddCircleOutline } from "@material-ui/icons";
import { Grid, Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
/** utils & constants */
import { formatValue, validateScript } from "../../app/util/lib";
import BET_RATES from "../../app/constants/betRates";
import { setCurrentGameType, setCurrentBetType, saveBetInfos, betGame } from "../../app/redux/actions/game";
import { getUserInfo } from "../../app/redux/actions/auth";
/** custom components */
import Layout from "../../app/layouts/Layout";
import RequireAuth from "../../app/layouts/RequireAuth";
import InputWithButton from "../../app/components/InputWithButton";
import Button from "../../app/components/Button";
/** betType contents */
import Score from "../../app/containers/BetTypes/Score";
import ThreeMore from "../../app/containers/BetTypes/3More";
import FourMore from "../../app/containers/BetTypes/4More";
import Backpack from "../../app/containers/BetTypes/Backpack";
import LotXien from "../../app/containers/BetTypes/LotXien";
import HeadAndTail from "../../app/containers/BetTypes/HeadAndTail";
import SlidingLot from "../../app/containers/BetTypes/SlidingLot";

const NorthernLottery = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((state) => state.user);
  const { betInfos, currentGameType, currentBetType, currentDigitType } = useSelector((state) => state.game);
  const [open, setOpen] = useState(false);
  const [selectedBetTypeIndex, setBetTypeIndex] = useState(0);
  const BET_TYPES = [
    {
      value: "backpack",
      label: t("bet_types.backpack"),
    },
    {
      value: "loxien",
      label: t("bet_types.loxien"),
    },
    {
      value: "score",
      label: t("bet_types.score"),
    },
    {
      value: "headandtail",
      label: t("bet_types.headandtail"),
    },
    {
      value: "threeMore",
      label: t("bet_types.3more"),
    },
    {
      value: "fourMore",
      label: t("bet_types.4more"),
    },
    {
      value: "slide",
      label: t("bet_types.slide"),
    },
  ];
  /** state for bet details */
  const [script, setScript] = useState("");
  const [allBetAmount, setAllBetAmount] = useState(0);
  const [countOfNumbers, setCount] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [multiple, setMultiple] = useState(1);
  const [betNumbers, setBetNumbers] = useState("");
  const [units, setUnits] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [tens, setTens] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [hundreds, setHundreds] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [thousands, setThousands] = useState([false, false, false, false, false, false, false, false, false, false]);

  const clearAll = () => {
    setUnits([false, false, false, false, false, false, false, false, false, false]);
    setTens([false, false, false, false, false, false, false, false, false, false]);
    setHundreds([false, false, false, false, false, false, false, false, false, false]);
    setThousands([false, false, false, false, false, false, false, false, false, false]);
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
      case "hundred":
        setHundreds((prevHundreds) => {
          const list = prevHundreds.map((e, i) => {
            if (i === index) return !e;
            return e;
          });
          return list;
        });
        break;
      case "thousand":
        setThousands((prevThousands) => {
          const list = prevThousands.map((e, i) => {
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
      case "hundred":
        setHundreds([true, true, true, true, true, true, true, true, true, true]);
        break;
      case "thousand":
        setThousands([true, true, true, true, true, true, true, true, true, true]);
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
      case "hundred":
        setHundreds([true, true, true, true, true, false, false, false, false, false]);
        break;
      case "thousand":
        setThousands([true, true, true, true, true, false, false, false, false, false]);
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
      case "hundred":
        setHundreds([false, false, false, false, false, true, true, true, true, true]);
        break;
      case "thousand":
        setThousands([false, false, false, false, false, true, true, true, true, true]);
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
      case "hundred":
        setHundreds([false, false, false, false, false, false, false, false, false, false]);
        break;
      case "thousand":
        setThousands([false, false, false, false, false, false, false, false, false, false]);
        break;
      default:
        break;
    }
  };
  /** end */

  const checkBetInfo = () => {
    let unit_count = 0;
    const selectedUnit = [];
    let ten_count = 0;
    const selectedTen = [];
    let hundred_count = 0;
    const selectedHundred = [];
    let thousand_count = 0;
    const selectedThousand = [];
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
    for (let index = 0; index < 10; index += 1) {
      if (hundreds[index] === true) {
        hundred_count += 1;
        selectedHundred.push(index.toString());
      }
    }
    for (let index = 0; index < 10; index += 1) {
      if (thousands[index] === true) {
        thousand_count += 1;
        selectedThousand.push(index.toString());
      }
    }
    let formattedNumbers;
    let phrase = "";
    let amount = 0;
    switch (currentDigitType.value) {
      case "lot2":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES.backpack.lot2 * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }
        if (unit_count === 0 || ten_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedUnit.map((index_unit) => selectedTen.map((index_ten) => `${index_ten}${index_unit};`));
        for (const item_1 of formattedNumbers) {
          for (const item_2 of item_1) {
            phrase = phrase.concat(item_2);
          }
        }
        amount = BET_RATES.backpack.lot2 * (phrase.split(";").length - 1) * multiple;
        setBetNumbers(phrase);
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        return { status: true, phrase };
      case "lot2_1K":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES.backpack.lot2_1K * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }
        if (unit_count === 0 || ten_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedUnit.map((index_unit) => selectedTen.map((index_ten) => `${index_ten}${index_unit};`));
        for (const item_1 of formattedNumbers) {
          for (const item_2 of item_1) {
            phrase += item_2;
          }
        }
        amount = BET_RATES.backpack.lot2_1K * (phrase.split(";").length - 1) * multiple;
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        setBetNumbers(phrase);
        return { status: true, phrase };
      case "lot3":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES.backpack.lot3 * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }

        if (unit_count === 0 || ten_count === 0 || hundred_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedUnit.map((index_unit) =>
          selectedTen.map((index_ten) => selectedHundred.map((index_hundred) => `${index_hundred}${index_ten}${index_unit};`))
        );
        for (const item_1 of formattedNumbers) {
          for (const item_2 of item_1) {
            for (const item_3 of item_2) {
              phrase += item_3;
            }
          }
        }
        amount = BET_RATES.backpack.lot3 * (phrase.split(";").length - 1) * multiple;
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        setBetNumbers(phrase);
        return { status: true, phrase };
      case "lot4":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES.backpack.lot4 * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }
        if (unit_count === 0 || ten_count === 0 || hundred_count === 0 || thousand_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedUnit.map((index_unit) =>
          selectedTen.map((index_ten) =>
            selectedHundred.map((index_hundred) => selectedThousand.map((index_thousand) => `${index_thousand}${index_hundred}${index_ten}${index_unit};`))
          )
        );

        for (const item_1 of formattedNumbers) {
          for (const item_2 of item_1) {
            for (const item_3 of item_2) {
              for (const item_4 of item_3) {
                phrase += item_4;
              }
            }
          }
        }
        amount = BET_RATES.backpack.lot4 * (phrase.split(";").length - 1) * multiple;
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        setBetNumbers(phrase);
        return { status: true, phrase };
      case "xien2":
      case "xien3":
      case "xien4":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES[currentBetType.value][currentDigitType.value] * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }
        return { status: false, phrase: null };
      case "first":
      case "special_topics":
      case "special_headline":
      case "problem":
      case "first_de":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES.score[currentDigitType.value] * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }
        if (unit_count === 0 || ten_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedUnit.map((index_unit) => selectedTen.map((index_ten) => `${index_ten}${index_unit};`));
        for (const item_1 of formattedNumbers) {
          for (const item_2 of item_1) {
            phrase = phrase.concat(item_2);
          }
        }
        amount = BET_RATES.score[currentDigitType.value] * (phrase.split(";").length - 1) * multiple;
        setBetNumbers(phrase);
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        return { status: true, phrase };
      case "head":
        if (ten_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedTen.map((index_ten) => `${index_ten};`);
        for (const item_1 of formattedNumbers) {
          phrase = phrase.concat(item_1);
        }
        amount = BET_RATES[currentBetType.value][currentDigitType.value] * (phrase.split(";").length - 1) * multiple;
        setBetNumbers(phrase);
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        return { status: true, phrase };
      case "tail":
        if (unit_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedUnit.map((index_unit) => `${index_unit};`);
        for (const item_1 of formattedNumbers) {
          phrase = phrase.concat(item_1);
        }
        amount = BET_RATES[currentBetType.value][currentDigitType.value] * (phrase.split(";").length - 1) * multiple;
        setBetNumbers(phrase);
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        return { status: true, phrase };
      case "pin3":
      case "pin3_headandtail":
      case "special_pin3":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES[currentBetType.value][currentDigitType.value] * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }

        if (unit_count === 0 || ten_count === 0 || hundred_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedUnit.map((index_unit) =>
          selectedTen.map((index_ten) => selectedHundred.map((index_hundred) => `${index_hundred}${index_ten}${index_unit};`))
        );
        for (const item_1 of formattedNumbers) {
          for (const item_2 of item_1) {
            for (const item_3 of item_2) {
              phrase += item_3;
            }
          }
        }
        amount = BET_RATES[currentBetType.value][currentDigitType.value] * (phrase.split(";").length - 1) * multiple;
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        setBetNumbers(phrase);
        return { status: true, phrase };
      case "special_pin4":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES[currentBetType.value][currentDigitType.value] * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }
        if (unit_count === 0 || ten_count === 0 || hundred_count === 0 || thousand_count === 0) {
          return { status: false, phrase: null };
        }
        formattedNumbers = selectedUnit.map((index_unit) =>
          selectedTen.map((index_ten) =>
            selectedHundred.map((index_hundred) => selectedThousand.map((index_thousand) => `${index_thousand}${index_hundred}${index_ten}${index_unit};`))
          )
        );

        for (const item_1 of formattedNumbers) {
          for (const item_2 of item_1) {
            for (const item_3 of item_2) {
              for (const item_4 of item_3) {
                phrase += item_4;
              }
            }
          }
        }
        amount = BET_RATES[currentBetType.value][currentDigitType.value] * (phrase.split(";").length - 1) * multiple;
        setBetAmount(amount);
        setCount(phrase.split(";").length - 1);
        setBetNumbers(phrase);
        return { status: true, phrase };
      case "slide4":
      case "slide8":
      case "slide10":
        if (script !== "") {
          if(!validateScript(script, currentBetType.value, currentDigitType.value))
            return {status: false, phrase: null};
          setBetNumbers(script);
          const counts = script.split(";").length - 1;
          amount = BET_RATES[currentBetType.value][currentDigitType.value] * counts * multiple;
          setBetAmount(amount);
          setCount(counts);
          return { status: true, phrase: script };
        }
        return { status: false, phrase: null };
      default:
        return false;
    }
  };

  /** bet process */
  const onQuickBet = () => {
    const savedOrders = betInfos;
    const checkResult = checkBetInfo();
    if (!checkResult.status || betAmount > user.balance) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } else {
      savedOrders.push({
        userId: user._id,
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
        dispatch(getUserInfo(user._id));
      }, 2000);
    }
  };

  const onMoreBet = () => {
    const checkResult = checkBetInfo();
    if (!checkResult.status || betAmount > user.balance) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } else {
      const savedInfos = betInfos;
      savedInfos.push({
        userId: user._id,
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
  /** end */

  useMemo(() => {
    dispatch(
      setCurrentGameType({
        label: t("game_types.northern.northern"),
        value: "northern",
      })
    );
    dispatch(setCurrentBetType(BET_TYPES[0]));
  }, []);

  useEffect(() => {
    dispatch(
      setCurrentGameType({
        label: t("game_types.northern.northern"),
        value: "northern",
      })
    );
  }, [t])

  useEffect(() => {
    checkBetInfo();
  }, [units, tens, hundreds, thousands, script]);

  useEffect(() => {
    if (multiple > 1000000) {
      setMultiple(1000000);
    }
    checkBetInfo();
  }, [multiple]);

  return (
    <Layout
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
        <div>
          {[
            selectedBetTypeIndex === 0 && (
              <Backpack
                script={script}
                setScript={(value) => setScript(value)}
                units={units}
                tens={tens}
                hundreds={hundreds}
                thousands={thousands}
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
                key="northern"
              />
            ),
            selectedBetTypeIndex === 1 && (
              <LotXien
                script={script}
                setScript={(value) => setScript(value)}
                clearAll={() => {
                  clearAll();
                }}
                gameType={props.gameType}
                key="loxien"
              />
            ),
            selectedBetTypeIndex === 2 && (
              <Score
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
                gameType={props.gameType}
                key="score"
              />
            ),
            selectedBetTypeIndex === 3 && (
              <HeadAndTail
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
                gameType={props.gameType}
                key="hadandtail"
              />
            ),
            selectedBetTypeIndex === 4 && (
              <ThreeMore
                script={script}
                setScript={(value) => setScript(value)}
                units={units}
                tens={tens}
                hundreds={hundreds}
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
                gameType={props.gameType}
                key="threemore"
              />
            ),
            selectedBetTypeIndex === 5 && (
              <FourMore
                script={script}
                setScript={(value) => setScript(value)}
                units={units}
                tens={tens}
                hundreds={hundreds}
                thousands={thousands}
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
                gameType={props.gameType}
                key="fourmore"
              />
            ),
            selectedBetTypeIndex === 6 && (
              <SlidingLot
                script={script}
                setScript={(value) => setScript(value)}
                clearAll={() => {
                  clearAll();
                }}
                gameType={props.gameType}
                key="slidinglot"
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
                    onQuickBet();
                  }}
                />
                <Button
                  title={t("buttons.more_bet")}
                  icon={<AddCircleOutline className="icon" style={{ color: "white" }} />}
                  onClick={() => {
                    onMoreBet();
                  }}
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

export default RequireAuth(NorthernLottery);
