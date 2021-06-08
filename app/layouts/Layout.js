import PropTypes from 'prop-types';
import Header from '../containers/Header';
import React, {useEffect} from 'react';

const Layout = props => {
    useEffect(() => {
        // console.log(props.children);
    }, []);
    return (
        <React.Fragment>
            <Header/>
            {props.children}
        </React.Fragment> 
    );
}

Layout.prototype = {
    children: PropTypes.any,
    theme: PropTypes.string
};

export default Layout;