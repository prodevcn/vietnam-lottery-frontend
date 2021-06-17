import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';

import Header from '../app/containers/Header';
import Button from '../app/components/Button';
import Slider from '../app/containers/Slider';


const App = props => {
  const router = useRouter();
  const {t} = useTranslation();

  const dateFormat = unixTime => {
    const date = Date.now();
    console.log(date);
  }
  
  const [resultNumber, setResultNumber] = useState('123456');

  useEffect(() => {
    dateFormat();
  }, []);
  
  return (
    <div className="context">
      <Header />
      <Slider />
      <Container maxWidth="lg" className="home__container">
        <Grid container spacing={3}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{textAlign: "center", margin: 20}}>
            <Button title={t("lottery_result")} />
          </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="betting_result_element">
                <div className="text_area">
                  <p>04-07-2021</p>
                  <p>{t("game_types.vip.hochiminh")}</p>
                </div>
                <div className="number_area">
                {
                  resultNumber.split('').map((item, index) => (
                      <div className="number__circle" key={`RESULT_${index}`}><h6 style={{color: "white"}}>{item}</h6></div>
                  ))
                }
                </div>                
              </div>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="betting_result_element">
                <div className="text_area">
                  <p>04-07-2021</p>
                  <p>{t("game_types.vip.hochiminh")}</p>
                </div>
                <div className="number_area">
                {
                  resultNumber.split('').map((item, index) => (
                      <div className="number__circle" key={`RESULT_${index}`}><h6 style={{color: "white"}}>{item}</h6></div>
                  ))
                }
                </div>                
              </div>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="betting_result_element">
                <div className="text_area">
                  <p>04-07-2021</p>
                  <p>{t("game_types.vip.hochiminh")}</p>
                </div>
                <div className="number_area">
                {
                  resultNumber.split('').map((item, index) => (
                      <div className="number__circle" key={`RESULT_${index}`}><h6 style={{color: "white"}}>{item}</h6></div>
                  ))
                }
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
                  <p className="date_text">
                    {t("game_types.vip.description")}
                  </p>
                </div>
                <div className="button__section" onClick={() => {}}>
                  <Button title={t("play_now")}/>
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
                  <p className="date_text">
                    {t("game_types.vip.description")}
                  </p>
                </div>
                <div className="button__section">
                  <Button title={t("play_now")}/>
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
                  <Button title={t("play_now")}/>
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
                  <p className="date_text">
                    {t("game_types.south.description")}
                  </p>
                </div>
                <div className="button__section">
                  <Button title={t("play_now")}/>
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
                  <Button title={t("play_now")} onClick={() => {router.push("/")}}/>
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
                  <Button title={t("play_now")} onClick={() => {router.push("/northern/northern-lottery")}}/>
                </div>
              </div>
            </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;