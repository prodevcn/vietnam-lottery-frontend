import {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import Grid from '@material-ui/core/Grid';
import TimerIcon from '@material-ui/icons/Timer';
import StarIcon from '@material-ui/icons/Star';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Countdown from 'react-countdown';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
isPlaying: true,
size: 120,
strokeWidth: 6
};

const Completionist = () => <span>You are good to go!</span>;

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <div style={{backgroundColor:"rgba(0, 0, 0, 0.4)", width: '100%', padding: "1rem 1rem", borderRadius: 5, }}> 
            <p className="date_text">{hours}</p>
            <p className="date_text">{minutes}</p>
            <p className="date_text">{seconds}</p>
        </div>
      );
    } else {
      // Render a countdown
      return (
          <div style={{backgroundColor:"rgba(0, 0, 0, 0.4)", width: '100%', padding: "1rem 1rem", borderRadius: 5, display: 'flex', justifyContent: "center"}}> 
            <p className="date_text">{hours} : </p>
            <p className="date_text">{minutes} : </p>
            <p className="date_text">{seconds}</p>
          </div>
      );
    }
  };

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const ResultBoard = props => {
    const {t} = useTranslation();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);
    
    /* setting for timer */
    // const startTime = Date.now() / 1000;
    // const endTime = startTime + 600;

    // const remainingTime = endTime - startTime;
    // const days = Math.ceil(remainingTime / daySeconds);
    // const daysDuration = days * daySeconds;

    return(
        <div className="__result_board_main">
            <Grid container spacing={1}>
                <Grid item lg={4} md={4} sm={12} xs={12} className="title__area">
                    <p className="game__title">{props.gameTitle}</p>
                    <p className="betting__type">{props.bettingType?.type} {">"} {props.bettingType?.digitType}</p>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="timer__area">
                    <div className="item_row">
                        <TimerIcon style={{color: "white"}} />
                        <p style={{color: "white"}}>{t("result_board.bet_time")}</p>
                    </div>
                    <div className="item_row">
                        <p style={{color: "white"}}>{t("result_board.lottery_draw")}</p>
                        <p style={{color: "rgb(255, 136, 1)"}}>{props.estimatedDate}</p>
                    </div>
                    <div className="item_row">
                        {/* <CountdownCircleTimer
                            {...timerProps}
                            colors={[["#7E2E84"]]}
                            duration={daysDuration}
                            initialRemainingTime={remainingTime}
                        >
                            {({ elapsedTime }) =>
                            renderTime("days", getTimeDays(daysDuration - elapsedTime))
                            }
                        </CountdownCircleTimer>
                        <CountdownCircleTimer
                            {...timerProps}
                            colors={[["#D14081"]]}
                            duration={daySeconds}
                            initialRemainingTime={remainingTime % daySeconds}
                            onComplete={(totalElapsedTime) => [
                            remainingTime - totalElapsedTime > hourSeconds
                            ]}
                        >
                            {({ elapsedTime }) =>
                            renderTime("hours", getTimeHours(daySeconds - elapsedTime))
                            }
                        </CountdownCircleTimer>
                        <CountdownCircleTimer
                            {...timerProps}
                            colors={[["#EF798A"]]}
                            duration={hourSeconds}
                            initialRemainingTime={remainingTime % hourSeconds}
                            onComplete={(totalElapsedTime) => [
                            remainingTime - totalElapsedTime > minuteSeconds
                            ]}
                        >
                            {({ elapsedTime }) =>
                            renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
                            }
                        </CountdownCircleTimer>
                        <CountdownCircleTimer
                            {...timerProps}
                            colors={[["#218380"]]}
                            duration={minuteSeconds}
                            initialRemainingTime={remainingTime % minuteSeconds}
                            onComplete={(totalElapsedTime) => [
                            remainingTime - totalElapsedTime > 0
                            ]}
                        >
                            {({ elapsedTime }) =>
                            renderTime("seconds", getTimeSeconds(elapsedTime))
                            }
                        </CountdownCircleTimer> */}
                        <Countdown
                            date={Date.now() + 6000}
                            renderer={renderer}
                        />
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="result_area">
                    <div className="item_row">
                        <StarIcon style={{color: "white"}} />
                        <p style={{color: "white"}}>{t("result_board.lottery_result")}</p>
                    </div>
                    <p style={{color: "rgb(255, 136, 1)", alignItems: "center"}}>{props.resultDate}</p>
                    <div className="number_area">
                        {
                            props.resultNumber?.split('').map((item, index) => (
                                <div className="number__circle" key={`RESULT_${index}`}><h6 style={{color: "white"}}>{item}</h6></div>
                            ))
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ResultBoard;