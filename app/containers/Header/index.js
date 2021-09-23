import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../components/Header/Logo";
import Navigation from "../../components/Header/Navigation";
import MobileMenu from "../../components/Header/MobileMenu";
import HeaderBtn from "../../components/Header/HeaderBtn";

import { getUserInfo } from "../../redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const {user} = useSelector(state => state.user);
  const {authenticated} = useSelector(state => state.auth);
  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    // let interval = null;
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    // if (authenticated) {
    //   interval = setInterval(() => {
    //     dispatch(getUserInfo(user._id));
    //   }, 30000);
    // }
    return () => {
      // window.removeEventListener("scroll", handleScroll);
      // if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <header className={`dg__header header--absolute space-right-left ${scroll > headerTop ? "stick" : ""}`}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-2 col-xl-2 col-6">
            <Logo image="/images/logo/logo.png" />
          </div>
          <div className="col-lg-7 col-xl-8 d-none d-lg-block">
            <Navigation />
          </div>
          <div className="col-lg-3 col-xl-2 col-6">
            <HeaderBtn />
          </div>
        </div>
      </div>
      <MobileMenu />
    </header>
  );
};

export default Header;
