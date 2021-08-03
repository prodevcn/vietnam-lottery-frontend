import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

import Button from "../../components/Button";
import OddsTheme from '../../components/OddsTheme';

const buttonStyle = {
    borderColor: '#646464', 
    color: '#646464',
    marginLeft: '1rem',
    marginRight: '1rem'
}

const SlidingLot = props => {

    const [digitType, setDigitType] = useState('4slide');
    const [inputType, setInputType] = useState('enter');
    const [script, setScript] = useState('');
    const {t} = useTranslation();
    const digitTypes = [
        {
            key: '4slide',
            title: t("bet_types.sub.4slide"),
            help: t("help.slide.4slide"),
            odds: '2.3',
        },
        {
            key: '8slide',
            title: t("bet_types.sub.8slide"),
            help: t("help.slide:8slide"),
            odds: '8',
        },
        {
            key: '10slide',
            title: t("bet_types.sub.10slide"),
            help: t("help.slide:10slide"),
            odds: '12',
        },
    ];
    const inputTypes = [
        {
            key: 'enter',
            title: t("bet_types.sub.enter")
        },
    ];

    const createRndScript = digits => {
        let phrase = '';
        for (let i = 0; i < digits; i ++) {
            if (digitType === '4slide') {
                for (let j = 0; j < 4; j++) {
                    let rand = Math.floor(Math.random() * 100);
                    if(j < 3) {
                        if(rand < 10) rand = '0' + rand + '&';
                        else rand = rand + '&';
                    } else {
                        if(rand < 10) rand = '0' + rand;
                        else rand = rand + ';';
                    }
                    phrase = phrase + rand;
                }
            }
            if (digitType === '8slide') {
                for (let j = 0; j < 8; j++) {
                    let rand = Math.floor(Math.random() * 100);
                    if(j < 7) {
                        if(rand < 10) rand = '0' + rand + '&';
                        else rand = rand + '&';
                    } else {
                        if(rand < 10) rand = '0' + rand;
                        else rand = rand + ';';
                    }
                    phrase = phrase + rand;
                }
            }
            if (digitType === '10slide') {
                for (let j = 0; j < 10; j++) {
                    let rand = Math.floor(Math.random() * 100);
                    if(j < 9) {
                        if(rand < 10) rand = '0' + rand + '&';
                        else rand = rand + '&';
                    } else {
                        if(rand < 10) rand = '0' + rand;
                        else rand = rand + ';';
                    }
                    phrase = phrase + rand;
                }
            }
        }
        setScript(phrase);
    };

    return(
        <div>
            <div className="bet_types_area">
                <Grid container spacing={0}>
                    <Grid item xl={7} lg={7} md={7} sm={12} xs={12} style={{textAlign: "center"}}>
                        {
                            digitTypes.map((element, index) => (
                                <Button 
                                    type={digitType === element.key ? 'selected' : 'outlined'} 
                                    title={element.title} 
                                    innerStyle={digitType !== element.key ? buttonStyle : null} 
                                    onClick={() => {setDigitType(element.key)}}
                                    key={`LOT_TYPE_${index}`}    
                                    />
                            ))
                        }
                    </Grid>
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12} style={{textAlign: "center"}}>
                        {
                            inputTypes.map((element, index) => (
                                <Button 
                                    type={inputType === element.key ? 'selected' : 'outlined'} 
                                    title={element.title} 
                                    innerStyle={inputType !== element.key ? buttonStyle : null} 
                                    onClick={() => {setInputType(element.key)}}
                                    key={`INPUT_TYPES_${index}`}
                                    />
                            ))
                        }
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                        {
                            digitTypes.map((element, index) => (
                                digitType===element.key && <p className="date_text" key={`LOT_HELP_${index}`}>{element.help}</p>
                            ))
                        }
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                        {
                            digitTypes.map((element, index) => (
                                digitType===element.key && <OddsTheme key={`ODDS_DESC_${index}`} description={"1  " + t("to") + "  " + element.odds} /> 
                            ))
                        }         
                    </Grid>
                </Grid>
            </div>
            <div className="set_number_area">
                { 
                    inputType=='enter' && (
                        <Grid container spacing={2}>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <textarea
                                    placeholder={t("select_num.set_script")} 
                                    className="script_area"
                                    onChange={(e) => {setScript(e.target.value)}}
                                    value={script}
                                    />
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                        <Button type='transparent' title={t("select_num.random")} />
                                    </Grid>
                                    <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                                        <Button title={"1 " + t("numbers")} type="outlined" onClick={() => {createRndScript(1);}} />
                                        <Button title={"2 " + t("numbers")} type="outlined" onClick={() => {createRndScript(2);}} />
                                        <Button title={"3 " + t("numbers")} type="outlined" onClick={() => {createRndScript(3);}} />
                                        <Button title={"5 " + t("numbers")} type="outlined" onClick={() => {createRndScript(5);}} />
                                        <Button title={"10 " + t("numbers")} type="outlined" onClick={() => {createRndScript(10);}} />
                                    </Grid>
                                </Grid>
                                <div className="row_flex" style={{justifyContent: "space-around"}}>
                                    {/* <Button title={t("download")}  type="success" /> */}
                                    <Button title={t("select_num.erase")} onClick={() => {setScript('');}}  type="disabled" />
                                </div>
                            </Grid>
                        </Grid>
                    )
                }
            </div>
        </div>
    );
}

export default SlidingLot;