import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Block from "@material-ui/icons/Block";
import Speed from "@material-ui/icons/Speed";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutline";
import { Grid, Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { formatValue } from "../../app/util/lib";
import Layout from "../../app/layouts/Layout";
import RequireAuth from "../../app/layouts/RequireAuth";
import InputWithButton from "../../app/components/InputWithButton";
import Button from "../../app/components/Button";

import { setCurrentGameType, setCurrentBetType, saveBetInfos, betGame } from "../../app/redux/actions/game";
import { getUserInfo } from "../../app/redux/actions/auth";

const JackPot = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
  const { user } = useSelector((state) => state.user);
  const [script, setScript] = useState("");
  const [allBetAmount, setAllBetAmount] = useState(0);
  const [countOfNumbers, setCount] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [multiple, setMultiple] = useState(1);
  const [betNumbers, setBetNumbers] = useState("");
  const [units, setUnits] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [tens, setTens] = useState([false, false, false, false, false, false, false, false, false, false]);

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

  return (
    <Layout
      gameType="northern"
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
            <p className="active_text">{t("")}</p>
          </div>
        </div>
        <div className="bet_button_area">
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
                  onClick={() => {}}
                />
                <Button
                  title={t("buttons.more_bet")}
                  icon={<AddCircleOutlined className="icon" style={{ color: "white" }} />}
                  onClick={() => {}}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequireAuth(JackPot);
