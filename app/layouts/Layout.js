import PropTypes from 'prop-types';
import Header from '../containers/Header';
const Layout = props => {
    return (
        <>
            <Header/>
            {props.children}
        </> 
    );
}

export default Layout;