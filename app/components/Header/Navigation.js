import Link from "next/link";
import { IoCaretDown } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth";

import { COUNTRIES } from "../../constants/countries";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const { authenticated } = useSelector((state) => state.auth);
  const [cookies] = useCookies();

  const getSlug = () => {
    if (cookies.user) {
      return (
        cookies.user.firstName.slice(0, 1) + cookies.user.lastName.slice(0, 1)
      );
    } else {
      return "user";
    }
  };

  return (
    <nav className="mainmenu__nav">
      <ul className="mainmenu">
        <li className="drop">
          <Link href="/vip-lottery/hochiminh-vip">
            <a>
              {" "}
              {t("game_types.vip.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            {/* <li>
                            <Link href='/vip-lottery/saigon-vip'><a>{t("game_types.vip.saigon")}</a></Link>
                        </li>
                        <li>
                            <Link href='/vip-lottery/hanoi-vip'><a>{t("game_types.vip.hanoi")}</a></Link>
                        </li>
                        <li>
                            <Link href='/vip-lottery/hochiminh-vip'><a>{t("game_types.vip.hochiminh")}</a></Link>
                        </li> */}
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/">
            <a>
              {t("game_types.mega.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            {/* <li>
                            <Link href='/mega/1minute'><a>{t("game_types.mega.one_second")}</a></Link>
                        </li>
                        <li>
                            <Link href='/mega/1second'><a>{t("game_types.mega.one_minute")}</a></Link>
                        </li> */}
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/">
            <a>
              {t("game_types.super_speed.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            {/* <li>
                            <Link href='/'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
                        </li> */}
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/">
            <a>
              {t("game_types.south.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            {/* <li>
                            <Link href='/home-one'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
                        </li> */}
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/">
            <a>
              {t("game_types.central.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            {/* <li>
                            <Link href='/home-one'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
                        </li> */}
            <li>
              <img src="/images/working.gif" className="coming_soon_icon" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          <Link href="/">
            <a>
              {t("game_types.northern.caption")} <IoCaretDown color="red" />
            </a>
          </Link>
          <ul className="dropdown">
            <li>
              <Link href="/northern/northern-lottery">
                <a>{t("game_types.northern.northern")}</a>
              </Link>
            </li>
            <li>
              {/* <Link href='/northern/special-18h25'><a>{t("game_types.northern.special")}</a></Link> */}
              <img src="/images/working.gif" className="coming_soon_icon" />
              <a>{t("coming_soon")}</a>
            </li>
            <li>
              {/* <Link href='/northern/scratch-lottery'><a>{t("game_types.northern.scratch")}</a></Link> */}
              <img src="/images/working.gif" className="coming_soon_icon" />
              <a>{t("coming_soon")}</a>
            </li>
          </ul>
        </li>
        <li className="drop">
          {COUNTRIES.map((element, index) => {
            if (element.code === i18n.language) {
              return (
                <ReactCountryFlag
                  countryCode={element.iconName}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  title={element.iconName}
                  key={`SELECTED_LANGUAGE_ENTRY_${index}`}
                />
              );
            }
          })}
          <IoCaretDown color="red" />
          <ul className="dropdown">
            {COUNTRIES.map((e, index) => (
              <li key={`LANGUAGE_ENTRY_${index}`}>
                <div
                  className={
                    i18n.language === e.code
                      ? "language_button selected"
                      : "language_button"
                  }
                  onClick={() => {
                    setLanguage(e.code);
                  }}
                >
                  <ReactCountryFlag
                    className="flag"
                    countryCode={e.iconName}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                    }}
                    title={e.iconName}
                  />
                  {e.name}
                </div>
              </li>
            ))}
          </ul>
        </li>
        {!authenticated ? (
          <Link href="/auth/login" className="date_text">
            <a className="date_text"> {t("login")}</a>
          </Link>
        ) : (
          <div style={{ display: "flex" }}>
            <img src="/images/user.png" style={{ width: 20, height: 20 }} />
            <p
              className="date_text"
              onClick={(e) => {
                e.preventDefault();
                dispatch(logout());
              }}
            >
              {t("logout")}
            </p>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
