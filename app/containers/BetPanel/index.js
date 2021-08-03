import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Block from "@material-ui/icons/Block";
import Speed from "@material-ui/icons/Speed";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutline";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

import Score from "../BetTypes/Score";
import ThreeMore from "../BetTypes/3More";
import FourMore from "../BetTypes/4More";
import Backpack from "../BetTypes/Backpack";
import LotXien from "../BetTypes/LotXien";
import HeadAndTail from "../BetTypes/HeadAndTail";
import SlidingLot from "../BetTypes/SlidingLot";
import InputWithButton from "../../components/InputWithButton";
import Button from "../../components/Button";

const buttonStyle = {
  borderColor: "#646464",
  color: "#646464",
  marginLeft: "1rem",
  marginRight: "1rem",
};

const BetPanel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedIndex, setIndex] = useState(0);
  const [multiple, setMultiple] = useState(1);
  const BET_TYPES = [t("bet_types.backpack"), t("bet_types.loxien"), t("bet_types.score"), t("bet_types.head_and_tail"), t("bet_types.3more"), t("bet_types.4more"), t("bet_types.sliding_lot")];

  return (
    <div>
      <div className="bread_crumb">
        {BET_TYPES.map((item, index) => (
          <div
            className="bread_crumb_item"
            onClick={() => {
              setIndex(index);
            }}
            key={`BREAD_CRUMB_KEY_${index}`}
          >
            <p className={selectedIndex === index ? "active_text" : "date_text"}>{item}</p>
          </div>
        ))}
      </div>
      <div>
      {[
        selectedIndex === 0 && <Backpack gameType={props.gameType} key="backpack" />,
        selectedIndex === 1 && <LotXien gameType={props.gameType} key="loxien" />,
        selectedIndex === 2 && <Score gameType={props.gameType} key="score" />,
        selectedIndex === 3 && <HeadAndTail gameType={props.gameType} key="hadandtail" />,
        selectedIndex === 4 && <ThreeMore gameType={props.gameType} key="threemore" />,
        selectedIndex === 5 && <FourMore gameType={props.gameType} key="fourmore" />,
        selectedIndex === 6 && <SlidingLot gameType={props.gameType} key="slidinglot" />,
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
                {t("select")} {0} {t("numbers")}
              </p>
              <p>
                {t("payout")} {0} {t("vnd")}
              </p>
            </div>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: "flex", marginTop: "1rem", justifyContent: "space-around", alignItems: "center" }}>
            <Button title={t("buttons.reset")} type="outlined" icon={<Block className="icon" />} innerStyle={{ backgroundColor: "#131313f0" }} />
            <Button title={t("buttons.quick_bet")} icon={<Speed className="icon" style={{ color: "white" }} />} />
            <Button title={t("buttons.more_bet")} icon={<AddCircleOutlined className="icon" style={{ color: "white" }} />} />
          </Grid>
        </Grid>
      </div>
      </div>
    </div>
  );
};

export default BetPanel;
