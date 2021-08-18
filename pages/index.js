import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {Grid, Container, Dialog, DialogContent } from "@material-ui/core";
import io from "socket.io-client";
import _ from "lodash";
import { API_URL } from "../app/constants/config";
import { setDate } from "../app/util/lib";
import Header from "../app/containers/Header";
import Button from "../app/components/Button";
import Slider from "../app/containers/Slider";
import { getGameAllLatestResults } from "../app/redux/actions/game";
import { checkAuth } from "../app/redux/actions/auth";

const socket = io.connect(API_URL);

const App = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {latestResults} = useSelector(state => state.game); 
  const [open, setOpen] = useState(false); // for alert
  const default_results = {
    northern: {},
    vip: {},
    mega: {},
    southern: {},
    central: {},
    super: {},
  };
  // const [results, setResults] = useState(default_results);

  const handleClose = () => {
    setOpen(false);
  };

  const getNewResults = () => {
    dispatch(getGameAllLatestResults());
      // .then((res) => {
      //   if (res && res.length !== 0) {
      //     const northern_result = res.map((e) => {
      //       if (e.gameType === "northern") return e;
      //     });
      //     const hochiminh_result = res.map((e) => {
      //       if (e.gameType === "hochiminh") return e;
      //     })
      //     setResults((state) => ({ ...state, hochiminh: hochiminh_result, northern: northern_result[0] }));
      //   }
      // })
      // .catch((err) => {
      //   console.error(err);
      // });
  };

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
                <p>
                  {setDate(
                    latestResults.northern?.endTime
                      ? latestResults.northern.endTime
                      : new Date().toString()
                  )}
                </p>
                <p>{t("game_types.vip.hochiminh")}</p>
              </div>
              <div className="number_area">
                {latestResults.hochiminh?.numbers
                  ? latestResults.hochiminh.numbers.redAward
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
                <p>
                  {setDate(
                    latestResults.northern?.endTime
                      ? latestResults.northern.endTime
                      : new Date().toString()
                  )}
                </p>
                <p>{t("game_types.northern.northern")}</p>
              </div>
              <div className="number_area">
                {latestResults.northern?.numbers
                  ? latestResults.northern.numbers.redAward
                      .split("")
                      .map((item, index) => (
                        <div className="number__circle" key={`RESULT_${index}`}>
                          <h6 style={{ color: "white" }}>{item}</h6>
                        </div>
                      ))
                  : _.range(0, 5).map((item, index) => (
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
                <img src="/images/lottery.png" className="icon" alt="lottery" />
                <p>{t("game_types.vip.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">{t("game_types.vip.description")}</p>
              </div>
              <div className="button__section">
                {/* <Button title={t("play_now")}/> */}
                {/* <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" alt="lottery" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div> */}
                <Button
                  title={t("play_now")}
                  onClick={() => {
                    router.push("/vip/hochiminh");
                  }}
                />
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" alt="lottery" />
                <p>{t("game_types.mega.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">{t("game_types.mega.description")}</p>
              </div>
              <div className="button__section">
                <Button
                  title={t("play_now")}
                  onClick={() => {
                    router.push("/mega/one-minute");
                  }}
                />
                {/* <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" alt="lottery" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div> */}
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" alt="lottery" />
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
                  <img src="/images/working.gif" className="coming_soon_icon" alt="lottery" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" alt="lottery" />
                <p>{t("game_types.south.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">{t("game_types.south.description")}</p>
              </div>
              <div className="button__section">
                <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" alt="lottery" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" alt="lottery" />
                <p>{t("game_types.central.caption")}</p>
              </div>
              <div className="description__section">
                <p className="date_text">
                  {t("game_types.central.description")}
                </p>
              </div>
              <div className="button__section">
                <div style={{ marginBottom: 20 }}>
                  <img src="/images/working.gif" className="coming_soon_icon" alt="lottery" />
                  <a className="date_text">{t("coming_soon")}</a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="game_selection_box">
              <div className="title__section">
                <img src="/images/lottery.png" className="icon" alt="lottery" />
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
