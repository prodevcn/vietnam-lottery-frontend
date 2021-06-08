import React, {useState, useEffect} from 'react';
import {animateScroll} from 'react-scroll';

import {
    FaFacebookSquare,
    FaTwitter
} from 'react-icons/fa';

import {MdExpandLess} from 'react-icons/md';

const Footer = props => {
    const [scroll, setScroll] = useState(0);
    const [top, setTop] = useState(0);

    useEffect(() => {
        setTop(100);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        animateScroll.scrollToTop();
    };

    const handleScroll  = () => {
        setScroll(window.scrollY);
    };

    return (
        <footer className='footer-area footer--1'>
            <div className='dg__footer_container bg__color--4'>
            <div className="container">
          <div className="row">
            {/* Start Single Widget */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 xs__mt--40">
              <div className="footer__widget information">
                <h4>Information</h4>
                <div className="footer__inner">
                  <ul className="ft__menu">
                    {/* <li>
                      <a href={process.env.PUBLIC_URL + "/"}>
                        Currency Exchange
                      </a>
                    </li> */}
                    <li>
                      <a href={process.env.PUBLIC_URL + "/"}>Today's Rate</a>
                    </li>
                    <li>
                      <a href={process.env.PUBLIC_URL + "/about"}>About CoinPay</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End Single Widget */}
            {/* Start Single Widget */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 md__mt--40 sm__mt--40">
              <div className="footer__widget support">
                <h4>Support</h4>
                <div className="footer__inner">
                  <ul className="ft__menu">
                    <li>
                      <a href={process.env.PUBLIC_URL + "/contact"}>Contact us</a>
                    </li>
                    <li>
                      <a href={process.env.PUBLIC_URL + "/dashboard/support"}>Support Center</a>
                    </li>
                    <li>
                      <a href={process.env.PUBLIC_URL + "/dev_doc"} target={"_blank"} rel={"noreferrer"}>Developer Guide</a>
                    </li>
                    {/* <li>
                      <a href={process.env.PUBLIC_URL + "/terms_condition"} target={"_blank"} rel={"noreferrer"}>
                        Terms &amp; Conditions
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            {/* End Single Widget */}
            {/* Start Single Widget */}
            <div className="col-lg-4 col-md-6 col-sm-6 md__mt--40 sm__mt--40">
              <div className="footer__widget resources">
                <h4>Contact</h4>
                <div className="footer__inner">
                  <ul>
                    <li>cn.bitmain@gmail.com</li>
                    <li>
                      Address:
                      <br /> Liaoning, CHINA 110011
                    </li>
                    <li>
                      Phone:
                      <br /> +1 213 275 2543
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End Single Widget */}
          </div>
        </div>
            </div>
        </footer>
    );
};

export default Footer;
