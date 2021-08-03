import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";

import _ from "lodash";

import Button from "../../components/Button";

import OddsTheme from "../../components/OddsTheme";

const buttonStyle = {
  borderColor: "#646464",
  color: "#646464",
  marginLeft: "1rem",
  marginRight: "1rem",
};

const HeadAndTail = (props) => {
  const [state_dozen, setDozenState] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [state_unit, setUnitState] = useState([false, false, false, false, false, false, false, false, false, false]);
  /* set numbers dozen*/
  const setDozenAll = () => {
    setDozenState([true, true, true, true, true, true, true, true, true, true]);
  };
  const clearDozenAll = () => {
    setDozenState([false, false, false, false, false, false, false, false, false, false]);
  };

  const updateDozen = (index) => {
    setDozenState((prevDozen) => {
      const list = prevDozen.map((e, i) => {
        if (i == index) return !e;
        return e;
      });
      return list;
    });
  };

  /* set numbers unit */
  const setUnitAll = () => {
    setUnitState([true, true, true, true, true, true, true, true, true, true]);
  };
  const clearUnitAll = () => {
    setUnitState([false, false, false, false, false, false, false, false, false, false]);
  };
  const updateUnit = (index) => {
    setUnitState((prevUnit) => {
      const list = prevUnit.map((e, i) => {
        if (i == index) return !e;
        return e;
      });
      return list;
    });
  };

  const [digitType, setDigitType] = useState("head");
  const [inputType, setInputType] = useState("select");

  const { t } = useTranslation();
  const digitTypes = [
    {
      key: "head",
      title: t("bet_types.sub.head"),
      help: t("help.headandtail.head"),
      odds: "98.5",
    },
    {
      key: "lot2_1K",
      title: t("bet_types.sub.tail"),
      help: t("help.headandtail.tail"),
      odds: "9.85",
    },
  ];

  return (
    <div>
      <div className="bet_types_area">
        <Grid container spacing={0}>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12} style={{ textAlign: "center" }}>
            {digitTypes.map((element, index) => (
              <Button
                type={digitType === element.key ? "selected" : "outlined"}
                title={element.title}
                innerStyle={digitType !== element.key ? buttonStyle : null}
                onClick={() => {
                  setDigitType(element.key);
                }}
                key={`LOT_TYPE_${index}`}
              />
            ))}
          </Grid>
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            {digitTypes.map(
              (element, index) =>
                digitType === element.key && (
                  <p className="date_text" key={`LOT_HELP_${index}`}>
                    {element.help}
                  </p>
                )
            )}
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            {digitTypes.map((element, index) => digitType === element.key && <OddsTheme key={`ODDS_DESC_${index}`} description={"1  " + t("to") + "  " + element.odds} />)}
          </Grid>
        </Grid>
      </div>
      <div className="set_number_area">
        {inputType === "select" && (
          <Grid container spacing={2}>
            {
                digitType === 'head' ? (<>
                    <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
                        <Grid container spacing={0} style={{ marginTop: "1rem" }}>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <p style={{ color: "#ff8801", marginBottom: 0 }}>{t("select_num.dozen")}</p>
                            </Grid>
                            {_.range(10).map((index) => (
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1} className="bet_button" key={index}>
                                <button
                                className={state_dozen[index] ? "number_button active" : "number_button"}
                                onClick={() => {
                                    updateDozen(index);
                                }}
                                >
                                {index}
                                </button>
                            </Grid>
                            ))}
                        </Grid>
                        </Grid>
                        <Grid item xl={5} lg={5} md={12} sm={12} xs={12}>
                        <Button
                            title={t("select_num.all")}
                            type="contained"
                            onClick={() => {
                            setDozenAll();
                            }}
                            innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                        />
                        <Button title={t("select_num.finance")} type="contained" innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                        <Button title={t("select_num.faint")} type="contained" innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                        <Button
                            title={t("select_num.erase")}
                            type="contained"
                            onClick={() => {
                            clearDozenAll();
                            }}
                            innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                        />
                        </Grid>
                </>): (<>
                    <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
                        <Grid container spacing={0} style={{ marginTop: "1rem" }}>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <p style={{ color: "#ff8801", marginBottom: 0 }}>{t("select_num.unit")}</p>
                            </Grid>
                            {_.range(10).map((index) => (
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1} className="bet_button" key={index}>
                                <button
                                className={state_unit[index] ? "number_button active" : "number_button"}
                                onClick={() => {
                                    updateUnit(index);
                                }}
                                >
                                {index}
                                </button>
                            </Grid>
                            ))}
                        </Grid>
                        </Grid>
                        <Grid item xl={5} lg={5} md={12} sm={12} xs={12}>
                        <Button
                            title={t("select_num.all")}
                            type="contained"
                            onClick={() => {
                            setUnitAll();
                            }}
                            innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                        />
                        <Button title={t("select_num.finance")} type="contained" innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                        <Button title={t("select_num.faint")} type="contained" innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                        <Button
                            title={t("select_num.erase")}
                            type="contained"
                            innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                            onClick={() => {
                            clearUnitAll();
                            }}
                        />
                        </Grid>
                </>)
            }
          </Grid>
        )}
      </div>
    </div>
  );
};

export default HeadAndTail;
