import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Layout from '../../app/layouts/Layout';
import Score from '../../app/containers/BetTypes/Score';
import ThreeMore from '../../app/containers/BetTypes/3More';
import FourMore from '../../app/containers/BetTypes/4More';
import Backpack from '../../app/containers/BetTypes/Backpack';
import LotXien from '../../app/containers/BetTypes/LotXien';
import HeadAndTail from '../../app/containers/BetTypes/HeadAndTail';
import SlidingLot from '../../app/containers/BetTypes/SlidingLot';

const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: 'rgb(255, 136, 1)',
      },
    },
    scrollButtons: {
      color: 'rgb(255, 136, 1)',
    }})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} scrollButtons='desktop' variant="scrollable" />);
  
const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        minWidth: 0, /* customize default style */
        marginRight: theme.spacing(1),
        '&:focus': {
        color: 'rgb(255, 136, 1)',
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
        >
        {value === index && (
            <div>{children}</div>
        )}
        </div>
    );
};
  
TabPanel.protoTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    };

    const allyProps = index => {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const HanoiVIP = props => {
    const {t} = useTranslation();
    const [value, setValue] = useState(0);
    const bettingTypes = [
      {
          label: t("bet_types.backpack"),
          component: <Backpack />,
      },
      {
          label: t("bet_types.loxien"),
          component: <LotXien />,
      },
      {
          label: t("bet_types.score"),
          component: <Score />,
      },
      {
          label: t("bet_types.head_and_tail"),
          component: <HeadAndTail />,
      },
      {
          label: t("bet_types.3more"),
          component: <ThreeMore />
      },
      {
          label: t("bet_types.4more"),
          component: <FourMore />,
      },
      {
          label: t("bet_types.sliding_lot"),
          component: <SlidingLot />,
      },
    ];

    const [totalState, setTotalState] = useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <StyledTabs 
                value={value}
                onChange={handleChange}
                aria-label="styled tabs example"
                >
                {
                    bettingTypes.map((item, index) => (
                        <StyledTab label={item.label} key={'TAB_KEY_' + index} {...allyProps(index)} />
                    ))
                }
            </StyledTabs>
            {
                bettingTypes.map((item, index) => (
                    <TabPanel value={value} index={index} key={'TAB_PANEL_' + index}>
                        {item.component}
                    </TabPanel>
                ))
            }
        </Layout>
    );
};

export default HanoiVIP;