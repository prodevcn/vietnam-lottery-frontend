import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
/** material ui */
import { Container, Grid, Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
/** custom components */
import Header from "../containers/Header";
// import Slider from '../containers/Slider';
import Advertiser from "../containers/Advertiser";
import ResultBoard from "../containers/ResultBoard";
import ResultTable from "../containers/ResultTable";
import BetHistoryTable from "../containers/BetHistoryTable";
import BetContentTable from "../containers/BetContentTable";
import Button from "../components/Button";
/** utils & constants */
import { betGame } from "../redux/actions/game";
import { getUserInfo } from "../redux/actions/auth";
import { formatValue, rateConvertor } from "../util/lib";

const Layout = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { betInfos, currentGameType } = useSelector((state) => state.game);
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [totalState, setTotalState] = useState(0);

  const doBet = () => {
    if (betInfos.length === 0) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } else {
      dispatch(betGame(betInfos));
      props.clearAll();
      props.clearAllAmount();
      setTimeout(() => {
        dispatch(getUserInfo(user.userId));
      }, 2000);
    }
  };

  return (
    <div className="context">
      <Header />
      <Container maxWidth="xl" className="game_panel_container">
        <Grid container spacing={3}>
          <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
            {/* <Slider /> */}
            <ResultBoard
              gameInfo={props.gameInfo}
              duration={props.duration}
              result={props.result}
            />
            <Container maxWidth="xl" className="control__panel">
              {props.children}
              <Grid container spacing={0}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <BetContentTable
                    clearAll={() => {
                      props.clearAllAmount();
                    }}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <p className="date_text">{t("total_state")}</p>
                    <p className="state_text">
                      {rateConvertor(props.allBetAmount)}
                    </p>
                    {/* <Button title={t("buttons.feed")} type='outlined' /> */}
                  </div>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Button
                    onClick={() => {
                      doBet();
                    }}
                    title={`${t("buttons.place_bet")} | `}
                    full
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <ResultTable gameType={props.gameType} />
            <Advertiser />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" className="game_panel_container">
        <BetHistoryTable gameType={props.gameType} />
      </Container>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent className="game_selection_box">
          <DialogContent>
            <div style={{ display: "flex" }}>
              <p className="date_text">{t("bet_err_msg")}</p>
            </div>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
