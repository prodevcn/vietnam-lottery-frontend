import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {Grid} from '@material-ui/core';
import _ from "lodash";
import Button from "../../components/Button";
import OddsTheme from '../../components/OddsTheme';
import { setCurrentBetType } from '../../redux/actions/game';

const buttonStyle = {
  borderColor: "#646464",
  color: "#646464",
  marginLeft: "1rem",
  marginRight: "1rem",
};

const JackPotPanel = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {currentBetType, currentDigitType, } = useSelector(state => state.game);
  const [inputType, setInputType] = useState("select");
  const inputTypes = [
    {
      value: "select",
      label: t("bet_types.sub.select"),
    },
    {
      value: "enter",
      label: t("bet_types.sub.enter"),
    },
    // {
    //     key: 'quick',
    //     title: t("bet_types.sub.quick")
    // },
  ];

  const createRndScript = (digits) => {
    let phrase = "";
    for (let i = 0; i < digits; i += 1) {
      const rand = Math.floor(Math.random() * 100);
      if (rand < 10) phrase = phrase + 0 + rand + ";";
      else phrase = phrase + rand + ";";
    }
    props.setScript(phrase);
  };

  useEffect(() => {
    props.clearAll();
  }, []);

  return(
    <div>
      <div className="bet_types_area">
        <Grid container spacing={0}>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12} style={{ textAlign: "center" }}>
            <Button type="selected" title={currentBetType.label}/>
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12} style={{ textAlign: "center" }}>
            {inputTypes.map((element, index) => (
              <Button
                type={inputType === element.value ? "selected" : "outlined"}
                title={element.label}
                innerStyle={inputType !== element.value ? buttonStyle : null}
                onClick={() => {
                  setInputType(element.value);
                  props.clearAll();
                }}
                key={`INPUT_TYPES_${index}`}
              />
            ))}
          </Grid>
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            <p className="date_text">
              {t("help.jackpot")}
            </p>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <OddsTheme description="1  to 85" />
          </Grid>
        </Grid>
      </div>
      <div className="set_number_area">
      {inputType === "select" && (
          <Grid container spacing={2}>
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
                        props.updateDigits("ten", index);
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
                  props.setDigitAll("ten");
                }}
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              />
              <Button
                title={t("select_num.finance")} 
                type="contained"
                onClick={() => {
                  props.setFirstHalf("ten")
                }}  
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              />
              <Button 
                title={t("select_num.faint")} 
                type="contained" 
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                onClick={() => {
                  props.setLastHalf("ten")
                }}
              />
              {/* <Button title={t("select_num.odd")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} />
                        <Button title={t("select_num.even")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} /> */}
              <Button
                title={t("select_num.erase")}
                type="contained"
                onClick={() => {
                  props.clearDigitAll("ten");
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
                      type="button"
                      className={props.units[index] ? "number_button active" : "number_button"}
                      onClick={() => {
                        props.updateDigits("unit", index);
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
                  props.setDigitAll("unit");
                }}
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              />
              <Button
                title={t("select_num.finance")} 
                type="contained"
                onClick={() => {
                  props.setFirstHalf("unit")
                }}  
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              />
              <Button 
                title={t("select_num.faint")} 
                type="contained" 
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                onClick={() => {
                  props.setLastHalf("unit")
                }}
              />
              {/* <Button title={t("select_num.odd")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} />
                        <Button title={t("select_num.even")} type='contained' innerStyle={{marginLeft: '0.5rem', marginRight: '0.5rem'}} /> */}
              <Button
                title={t("select_num.erase")}
                type="contained"
                innerStyle={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                onClick={() => {
                  props.clearDigitAll("unit");
                }}
              />
            </Grid>
          </Grid>
        )}
        {inputType === "enter" && (
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <textarea
                placeholder={t("select_num.set_script")}
                className="script_area"
                value={props.script}
                onChange={(e) => {
                  props.setScript(e.target.value);
                }}
              />
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
                {/* <Button title={t("download")} type="success" /> */}
                <Button title={t("select_num.erase")} type="disabled" onClick={() => props.clearAll()} />
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default JackPotPanel;