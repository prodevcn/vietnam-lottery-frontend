import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
/** material */
import { Block, Speed, AddCircleOutline } from "@material-ui/icons";
import { Grid, Dialog, DialogContent, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
/** utils & constants */
import { formatValue, validateScript } from "../../app/util/lib";
import BET_RATES from "../../app/constants/betRates";
import { setCurrentGameType, setCurrentBetType, saveBetInfos, betGame } from "../../app/redux/actions/game";
import { getUserInfo } from "../../app/redux/actions/auth";
/** custom components */
import Layout from "../../app/layouts/Layout";
import RequireAuth from "../../app/layouts/RequireAuth";
import InputWithButton from "../../app/components/InputWithButton";
import Button from "../../app/components/Button";

const OneMinute = props => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const { betInfos, currentGameType, currentBetType, currentDigitType } = useSelector((state) => state.game);
    const [open, setOpen] = useState(false);
    const [selectedBetTypeIndex, setBetTypeIndex] = useState(0);

    useMemo(() => {

    }, []);

    return (
        <div>sss</div>
    );
};

export default OneMinute;