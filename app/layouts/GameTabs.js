import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import _ from 'lodash';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: 10,
  },
  padding: {
    padding: theme.spacing(3),
  },
}));

const GameTabs = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <StyledTabs 
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
        >
        {
            props.bettingTypes?.map((item, index) => (
                <StyledTab label={item.label} key={'TAB_KEY_' + index} {...allyProps(index)} />
            ))
        }
      </StyledTabs>
      {
            props.bettingTypes?.map((item, index) => (
                <TabPanel value={value} index={index} key={'TAB_PANEL_' + index}>
                    {item.component}
                </TabPanel>
            ))
      }
    </div>
  );
}

export default GameTabs;