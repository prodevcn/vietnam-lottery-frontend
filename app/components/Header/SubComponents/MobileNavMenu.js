import React, {useEffect} from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { useSelector, useDispatch } from "react-redux";

import { getBalance } from "../../../redux/actions/game";
import COUNTRIES from "../../../constants/countries";
import UserIcon from "../../../../public/images/svg/user.svg";

const MobileNavMenu = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { user, balance } = useSelector((state) => state.user);
  const { authenticated } = useSelector((state) => state.auth);

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const token = await localStorage.getItem('token');
      dispatch(getBalance(user.userId, token));  
    }, 120000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <nav className="offcanvasNavigation" id="offcanvas-navigation">
      <ul>
        <li className="menuItemHasChildren">
          <Link href="/vip/hochiminh">
            <a>{t("game_types.vip.caption")}</a>
          </Link>
          <ul className="subMenu">
            <li>
              <Link href='/vip/saigon'><a>{t("game_types.vip.saigon")}</a></Link>
            </li>
            <li>
              <Link href='/vip/hanoi'><a>{t("game_types.vip.hanoi")}</a></Link>
            </li>
            <li>
              <Link href='/vip/hochiminh'>
                <a>{t("game_types.vip.hochiminh")}</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="menuItemHasChildren">
          <Link href="/mega/one-minute">
            <a>{t("game_types.mega.caption")}</a>
          </Link>
          <ul className="subMenu">
            <li>
                <Link href='/mega/one-minute'><a>{t("game_types.mega.one_second")}</a></Link>
            </li>
            {/* <li>
              <div className="coming_soon_mobile">
                <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
                <a>{t("coming_soon")}</a>
              </div>
            </li> */}
          </ul>
        </li>
        <li className="menuItemHasChildren">
          <Link href="/superspeed/superspeed">
            <a>{t("game_types.superspeed.caption")}</a>
          </Link>
          <ul className="subMenu">
            {/* <li>
                    <Link href='/blog'><a>Hà Nội VIP</a></Link>
                </li>
                <li>
                    <Link href='/blog-right-sidebar'>
                        <a>Hồ Chí Minh VIP</a>
                    </Link>
                </li> */}
            <li>
              <div className="coming_soon_mobile">
                <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
                <a>{t("coming_soon")}</a>
              </div>
            </li>
          </ul>
        </li>
        {/* <li className="menuItemHasChildren">
          <Link href="/blog">{t("game_types.south.caption")}</Link>
          <ul className="subMenu">
            <li>
              <Link href='/blog'><a>Hà Nội VIP</a></Link>
            </li>
            <li>
              <Link href='/blog-right-sidebar'>
                <a>Hồ Chí Minh VIP</a>
              </Link>
            </li>
            <li>
              <div className="coming_soon_mobile">
                <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
                <a>{t("coming_soon")}</a>
              </div>
            </li>
          </ul>
        </li> */}
        {/* <li className="menuItemHasChildren">
          <Link href="/blog">{t("game_types.central.caption")}</Link>
          <ul className="subMenu">
            <li>
              <Link href='/blog'><a>Hà Nội VIP</a></Link>
            </li>
            <li>
              <Link href='/blog-right-sidebar'>
                <a>Hồ Chí Minh VIP</a>
              </Link>
            </li>
            <li>
              <div className="coming_soon_mobile">
                <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
                <a>{t("coming_soon")}</a>
              </div>
            </li>
          </ul>
        </li> */}
        <li className="menuItemHasChildren">
          <Link href="/northern/northern-lottery">
            <a>{t("game_types.northern.caption")}</a>
          </Link>
          <ul className="subMenu">
            <li>
              <Link
                href="/northern/northern-lottery"
                onClick={() => {
                  props.closeMenu();
                }}
              >
                <a>{t("game_types.northern.northern")}</a>
              </Link>
            </li>
            <li>
              <Link href="/northern/jackpot">
                <a>{t("game_types.northern.jackpot")}</a>
              </Link>
            </li>
            <li>
              <div className="coming_soon_mobile">
                <img src="/images/working.gif" className="coming_soon_icon" alt="working" />
                <a>{t("coming_soon")}</a>
              </div>
            </li>
          </ul>
        </li>
        <li className="menuItemHasChildren">
          {COUNTRIES.map((element, index) => {
            if (element.code === i18n.language) {
              return (
                <div style={{ color: "white" }} key={`SELECTED_LANGUAGE_ENTRY_${index}`}>
                  <ReactCountryFlag
                    countryCode={element.iconName}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                    }}
                    title={element.iconName}
                  />{" "}
                  {element.name}
                </div>
              );
            }
            return null;
          })}
          <ul className="subMenu">
            {COUNTRIES.map((e, index) => (
              <li key={`LANGUAGE_ENTRY_${index}`}>
                <div
                  className={i18n.language === e.code ? "language_button selected" : "language_button"}
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
        <li>
          {authenticated &&(
            <div style={{ display: "flex" }}>
              {/* <img src="/images/user.png" style={{ width: 20, height: 20 }} /> */}
              <UserIcon />
              <p className="date_text">{user?.balance}</p>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
