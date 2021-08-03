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

const LotXien = props => {

    const [digitType, setDigitType] = useState('xien2');
    const [inputType, setInputType] = useState('enter');
    const [script, setScript] = useState('');
    const {t} = useTranslation();
    const digitTypes = [
        {
            key: 'xien2',
            title: t("bet_types.sub.xien2"),
            help: t("help.loxien.xien2"),
            odds: '16',
        },
        {
            key: 'xien3',
            title: t("bet_types.sub.xien3"),
            help: t("help.loxien.xien3"),
            odds: '65',
        },
        {
            key: 'xien4',
            title: t("bet_types.sub.xien4"),
            help: t("help.loxien.xien4"),
            odds: '180',
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
            if (digitType === 'xien2') {
                let rand1 = (Math.randoMath.floorm() * 100);
                let rand2 = Math.floor(Math.random() * 100);
                if (rand1 < 10)  rand1 = '0' + rand1 + "&";
                else rand1 = rand1+"&";
                if (rand2 < 10) rand2 = '0' + rand2;
                phrase =phrase + rand1 + rand2+';';
            }
            if (digitType === 'xien3') {
                let rand1 = Math.floor(Math.random() * 100);
                let rand2 = Math.floor(Math.random() * 100);
                let rand3 = Math.floor(Math.random() * 100);
                if (rand1 < 10)  rand1 = '0' + rand1 + "&";
                else rand1 = rand1+"&";
                if (rand2 < 10)  rand2 = '0' + rand2 + "&";
                else rand2 = rand2+"&";
                if (rand3 < 10) rand3 = '0' + rand3;
                phrase =phrase + rand1 + rand2+ rand3 + ';';
            }
            if (digitType === 'xien4') {
                let rand1 = Math.floor(Math.random() * 100);
                let rand2 = Math.floor(Math.random() * 100);
                let rand3 = Math.floor(Math.random() * 100);
                let rand4 = Math.floor(Math.random() * 100);
                if (rand1 < 10)  rand1 = '0' + rand1 + "&";
                else rand1 = rand1+"&";
                if (rand2 < 10)  rand2 = '0' + rand2 + "&";
                else rand2 = rand2+"&";
                if (rand3 < 10)  rand3 = '0' + rand3 + "&";
                else rand3 = rand3+"&";
                if (rand4 < 10) rand4 = '0' + rand4;
                phrase =phrase + rand1 + rand2+ rand3 + rand4 + ';';
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

export default LotXien;