import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {Grid, Container, Dialog, DialogContent, useMediaQuery} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import io from "socket.io-client";
import _ from "lodash";

import { API_URL } from "../app/constants/config";
import { getGameLatestResult } from "../app/redux/actions/game";
import { setDate } from "../app/util/lib";

import Header from "../app/containers/Header";
import Button from "../app/components/Button";
import Slider from "../app/containers/Slider";
import { checkAuth } from "../app/redux/actions/auth";
import { getLatestGameData } from "../app/redux/actions/auth";
const socket = io.connect(API_URL);

const App = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const {authenticated} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); //for alert
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const default_results = {
    northern: {},
    vip: {},
    mega: {},
    southern: {},
    central: {},
    super: {},
  };
  const [results, setResults] = useState(default_results);

  const handleClose = () => {
    setOpen(false);
  };

  const getNewResults = () => {
    dispatch(getGameLatestResult())
      .then((res) => {
        if (res.length !== 0) {
          const northern_result = res.map((e) => {
            if (e.gameType === "northern") return e;
          });
          setResults((state) => ({ ...state, northern: northern_result[0] }));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    socket.on("new result", (data) => {
      console.log(data);
      getNewResults();
    });
  }, []);

  useEffect(() => {
    getNewResults();
    dispatch(checkAuth());
    if (router.query?.message) {
      setOpen(true);
    }
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);

  return (
    <div className="context">
      <Header />
      <Slider />
      <Container maxWidth="lg" className="home__container">
        <Grid container spacing={3}>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ textAlign: "center", margin: 20 }}
          >
            <Button title={t("lottery_result")} />
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="betting_result_element">
              <div className="text_area">
                <p>{setDate(new Date().toString())}</p>
                <p>{t("game_types.vip.hochiminh")}</p>
              </div>
              <div className="number_area">
                {/* {
                  resultNumber.split('').map((item, index) => (
                      <div className="number__circle" key={`RESULT_${index}`}><h6 style={{color: "white"}}>{item}</h6></div>
                  ))
                } */}
                {_.range(0, 6).map((item, index) => (
                  <div className="number__circle" key={`RESULT_${index}`}>
                    <h6 style={{ color: "white" }}>_</h6>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="betting_result_element">
              <div className="text_area">
                <p>
                  {setDate(
                    results.northern.endTime
                      ? results.northern.endTime
                      : new Date().toString()
                  )}
                </p>
                <p>{t("game_types.northern.northern")}</p>
              </div>
              <div className="number_area">
                {results.northern.numbers
                  ? results.northern.numbers.redAward
                      .split("")
                      .map((item, index) => (
                        <div className="number__circle" key={`RESULT_${index}`}>
                          <h6 style={{ color: "white" }}>{item}</h6>
                        </div>
                      ))
                  : _.range(0, 6).map((item, index) => (
                      <div className="number__circle" key={`RESULT_${index}`}>
                        <h6 style={{ color: "white" }}>_</h6>
                      </div>
                    ))}
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="betting_result_element">
              <div className="text_area">
                <p>{setDate(new Date().toString())}</p>
                <p>{t("game_types.vip.hochiminh")}</p>
              </div>
              <div className="number_area">
                {/* {
                  resultNumber.split('').map((item, index) => (
                      <div className="number__circle" key={`RESULT_${index}`}><h6 style={{color: "white"}}>{item}</h6></div>
                  ))
                } */}
                {_.range(0, 6).map((item, index) => (
                  <div className="number__circle" key={`RESULT_${index}`}>
                    <h6 style={{ color: "white" }}>_</h6>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" />
                <p>{t("game_types.vip.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">{t("game_types.vip.description")}</p>
              </div>
              <div className="button__section" onClick={() => {}}>
                {/* <Button title={t("play_now")}/> */}
                <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" />
                <p>{t("game_types.mega.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">{t("game_types.mega.description")}</p>
              </div>
              <div className="button__section">
                {/* <Button title={t("play_now")}/> */}
                <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" />
                <p>{t("game_types.super_speed.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">
                  {t("game_types.super_speed.description")}
                </p>
              </div>
              <div className="button__section">
                {/* <Button title={t("play_now")}/> */}
                <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" />
                <p>{t("game_types.south.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">{t("game_types.south.description")}</p>
              </div>
              <div className="button__section">
                <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" />
                <p>{t("game_types.central.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">
                  {t("game_types.central.description")}
                </p>
              </div>
              <div className="button__section">
                <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" />
                <p>{t("game_types.northern.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">
                  {t("game_types.northern.description")}
                </p>
              </div>
              <div className="button__section">
                <Button
                  title={t("play_now")}
                  onClick={() => {
                    router.push("/northern/northern-lottery");
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent className="game_selection_box">
          <DialogContent>
            <div style={{ display: "flex" }}>
              <p className="date_text">{t("auth_message")}</p>
            </div>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
