import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from '../containers/Header';
import Slider from '../containers/Slider';
import Advertiser from '../containers/Advertiser';
import ResultBoard from '../containers/ResultBoard';
import ResultTable from '../containers/ResultTable';
import BetHistoryTable from '../containers/BetHistoryTable';
import BetContentTable from '../containers/BetContentTable';
import Button from '../components/Button';

const Layout = props => {
    const {t} = useTranslation();
    const [totalState, setTotalState] = useState(0);
    return (
        <div className="context">
            <Header/>
            <Container maxWidth="xl" className="game_panel_container">
                <Grid container spacing={3}>
                    <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
                        {/* <Slider /> */}
                        <ResultBoard 
                            gameTitle={t("game_types.northern.northern")} 
                            bettingType={{type: 'backpack', digitType: '1more'}}
                            estimatedDate="2021-06-22"
                            resultDate="2021-06-23"
                            resultNumber="542111"
                        />
                        <Container maxWidth="xl" className="control__panel">
                            {props.children}
                            <Grid container spacing={0}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <BetContentTable />
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent: 'space-around'}}>
                                    <p className="date_text">{t("total_state")}</p>
                                    <p className="state_text">{totalState}</p>
                                    <Button title={t("buttons.feed")} type='outlined' />
                                    </div>
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Button title={t("buttons.place_bet") + ' | ' + ''} full />
                                </Grid> 
                            </Grid>
                        </Container>
                    </Grid>
                    <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
                        <ResultTable title={t("game_types.northern.northern")} />
                        <Advertiser />
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl" className="game_panel_container">
                <BetHistoryTable />
            </Container>
        </div> 
    );
}

export default Layout;