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

const ThreeMore = (props) => {
  const [state_dozen, setDozenState] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [state_unit, setUnitState] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [state_hundred, setHundredState] = useState([false, false, false, false, false, false, false, false, false, false]);
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

  /* set numbers hundred */
  const setHundredAll = () => {
    setHundredState([true, true, true, true, true, true, true, true, true, true]);
  };
  const clearHundredAll = () => {
    setHundredState([false, false, false, false, false, false, false, false, false, false]);
  };
  const updateHundred = (index) => {
    setHundredState((prevUnit) => {
      const list = prevUnit.map((e, i) => {
        if (i == index) return !e;
        return e;
      });
      return list;
    });
  };


  const [digitType, setDigiType] = useState("3pin");
  const [inputType, setInputType] = useState("select");
  const [script, setScript] = useState("");

  const { t } = useTranslation();
  const digitTypes = [
    {
      key: "3pin",
      title: t("bet_types.sub.3pin"),
      help: t("help.3more.3pin"),
      odds: "960",
    },
    {
      key: "3pin_headandtail",
      title: t("bet_types.sub.3pin_headandtail"),
      help: t("help.3more.3pin_headandtail"),
      odds: "960",
    },
    {
      key: "3_special_pins",
      title: t("bet_types.sub.3_special_pins"),
      help: t("help.3more.3_special_pins"),
      odds: "960",
    },
  ];
  const inputTypes = [
    {
      key: "select",
      title: t("bet_types.sub.select"),
    },
    {
      key: "enter",
      title: t("bet_types.sub.enter"),
    },
  ];

  const createRndScript = (digits) => {
    let phrase = "";
    for (let i = 0; i < digits; i++) {
      const rand = Math.floor(Math.random() * 1000);
      if (rand < 10) {
          phrase = phrase + "00" + rand + ";";
        } else if (rand < 100) {
            phrase = phrase + "0" + rand + ";";
        } else {phrase = phrase + rand + ";";}    
    }
    setScript(phrase);
  };

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
                  setDigiType(element.key);
                }}
                key={`LOT_TYPE_${index}`}
              />
            ))}
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12} style={{ textAlign: "center" }}>
            {inputTypes.map((element, index) => (
              <Button
                type={inputType === element.key ? "selected" : "outlined"}
                title={element.title}
                innerStyle={inputType !== element.key ? buttonStyle : null}
                onClick={() => {
                  setInputType(element.key);
                }}
                key={`INPUT_TYPES_${index}`}
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
                <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
                  <Grid container spacing={0} style={{ marginTop: "1rem" }}>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                      <p style={{ color: "#ff8801", marginBottom: 0 }}>{t("select_num.hundred")}</p>
                    </Grid>
                    {_.range(10).map((index) => (
                      <Grid item xl={1} lg={1} md={1} sm={1} xs={1} className="bet_button" key={index}>
                        <button
                          className={state_hundred[index] ? "number_button active" : "number_button"}
                          onClick={() => {
                            updateHundred(index);
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
                      setHundredAll();
                    }}
                    innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                  />
                  <Button title={t("select_num.finance")} type="contained" innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                  <Button title={t("select_num.faint")} type="contained" innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                  {/* <Button title={t("select_num.odd")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} />
                                    <Button title={t("select_num.even")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} /> */}
                  <Button
                    title={t("select_num.erase")}
                    type="contained"
                    innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                    onClick={() => {
                      clearHundredAll();
                    }}
                  />
                </Grid>
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
              {/* <Button title={t("select_num.odd")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} />
                        <Button title={t("select_num.even")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} /> */}
              <Button
                title={t("select_num.erase")}
                type="contained"
                onClick={() => {
                  clearDozenAll();
                }}
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              />
            </Grid>
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
              {/* <Button title={t("select_num.odd")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} />
                        <Button title={t("select_num.even")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} /> */}
              <Button
                title={t("select_num.erase")}
                type="contained"
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                onClick={() => {
                  clearUnitAll();
                }}
              />
            </Grid>
          </Grid>
        )}
        {inputType == "enter" && (
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <textarea placeholder={t("select_num.set_script")} className="script_area" value={script} onChange={(e) => {setScript(e.target.value)}} />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Grid container spacing={1}>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                  <Button type="transparent" title={t("select_num.random")} />
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                  <Button
                    title={"10 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(10);
                    }}
                  />
                  <Button
                    title={"20 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(20);
                    }}
                  />
                  <Button
                    title={"30 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(30);
                    }}
                  />
                  <Button
                    title={"40 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(40);
                    }}
                  />
                  <Button
                    title={"50 " + t("numbers")}
                    type="outlined"
                    onClick={() => {
                      createRndScript(50);
                    }}
                  />
                </Grid>
                {/* <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                        <Button type='transparent' title={t("select_num.suggestions")} />
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                        <Button title={"1 " + t("numbers")} type="outlined" />
                        <Button title={"2 " + t("numbers")} type="outlined" />
                        <Button title={"3 " + t("numbers")} type="outlined" />
                        <Button title={"5 " + t("numbers")} type="outlined" />
                        <Button title={"10 " + t("numbers")} type="outlined" />
                    </Grid> */}
                {/* <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                  <Button type="transparent" title={t("select_num.rarely_appear")} />
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                  <Button title="Top 1" type="outlined" />
                  <Button title="Top 2" type="outlined" />
                  <Button title="Top 5" type="outlined" />
                  <Button title="Top 10" type="outlined" />
                  <Button title="Top 20" type="outlined" />
                </Grid> */}
              </Grid>
              <div className="row_flex" style={{ justifyContent: "space-around" }}>
                <Button title={t("download")} type="success" />
                <Button title={t("select_num.erase")} type="disabled" />
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default ThreeMore;
