import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from 'react-redux';
import _ from "lodash";
import { setCurrentBetType, setCurrentDigitType } from "../../redux/actions/game";
import Button from "../../components/Button";
import OddsTheme from "../../components/OddsTheme";


const buttonStyle = {
  borderColor: "#646464",
  color: "#646464",
  marginLeft: "1rem",
  marginRight: "1rem",
};

const HeadAndTail = (props) => {
  const dispatch = useDispatch();
  const [digitType, setDigitType] = useState("head");
  const [inputType, setInputType] = useState("select");
  const { t } = useTranslation();
  const digitTypes = [
    {
      value: "head",
      label: t("bet_types.sub.head"),
      help: t("help.headandtail.head"),
      odds: "98.5",
    },
    {
      value: "lot2_1K",
      label: t("bet_types.sub.tail"),
      help: t("help.headandtail.tail"),
      odds: "9.85",
    },
  ];

  useEffect(() => {
    props.clearAll();
    dispatch(setCurrentBetType({
      value: 'headandtail',
      label: t("bet_types.headandtail"),
    }, ));
    dispatch(setCurrentDigitType(digitTypes[0]));
  }, [])

  return (
    <div>
      <div className="bet_types_area">
        <Grid container spacing={0}>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12} style={{ textAlign: "center" }}>
            {digitTypes.map((element, index) => (
              <Button
                type={digitType === element.value ? "selected" : "outlined"}
                title={element.label}
                innerStyle={digitType !== element.value ? buttonStyle : null}
                onClick={() => {
                  setDigitType(element.value);
                }}
                key={`LOT_TYPE_${index}`}
              />
            ))}
          </Grid>
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            {digitTypes.map(
              (element, index) =>
                digitType === element.value && (
                  <p className="date_text" key={`LOT_HELP_${index}`}>
                    {element.help}
                  </p>
                )
            )}
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            {digitTypes.map((element, index) => digitType === element.value && <OddsTheme key={`ODDS_DESC_${index}`} description={"1  " + t("to") + "  " + element.odds} />)}
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
                                type="button"
                                className={props.tens[index] ? "number_button active" : "number_button"}
                                onClick={() => {
                                    props.updateDigits('ten', index);
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
                              props.setDigitAll('ten');
                            }}
                            innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                        />
                        <Button title={t("select_num.finance")} type="contained" innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                        <Button title={t("select_num.faint")} type="contained" innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                        <Button
                            title={t("select_num.erase")}
                            type="contained"
                            onClick={() => {
                              props.clearDigitAll('ten');
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
                                type="button"
                                className={props.units[index] ? "number_button active" : "number_button"}
                                onClick={() => {
                                    props.updateDigits('unit', index);
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
                              props.setDigitAll('unit');
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
                              props.clearDigitAll('unit');
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
