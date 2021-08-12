import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { useSelector, useDispatch } from 'react-redux';
import {useRouter} from 'next/router';
import { Button } from "@material-ui/core";

import { logout } from "../../../redux/actions/auth";
import COUNTRIES from '../../../constants/countries';

import LoginIcon from '../../../../public/images/svg/login.svg';
import LogoutIcon from '../../../../public/images/svg/logout.svg';
import UserIcon from '../../../../public/images/svg/user.svg';

const MobileNavMenu = props => {
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const { authenticated } = useSelector((state) => state.auth);
    const router = useRouter(); 

    const setLanguage = lang => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
    };

    return (
        <nav className='offcanvasNavigation' id='offcanvas-navigation'>
            <ul>
                <li className="menuItemHasChildren">
                    <Link href='/vip-lottery/hochiminh-vip'><a>{t("game_types.vip.caption")}</a></Link>
                    <ul className="subMenu">
                        {/* <li>
                            <Link href='/vip-lottery/saigon-vip'><a>{t("game_types.vip.saigon")}</a></Link>
                        </li>
                        <li>
                            <Link href='/vip-lottery/hanoi-vip'><a>{t("game_types.vip.hanoi")}</a></Link>
                        </li>
                        <li>
                            <Link href='/vip-lottery/hochiminh-vip'>
                                <a>{t("game_types.vip.hochiminh")}</a>
                            </Link>
                        </li> */}
                        <li><div className="coming_soon_mobile"><img src="/images/working.gif" className="coming_soon_icon" alt="working" /><a>{t("coming_soon")}</a></div></li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/service'><a>{t("game_types.mega.caption")}</a></Link>
                    <ul className="subMenu">
                        {/* <li>
                            <Link href='/service'><a>{t("game_types.mega.one_second")}</a></Link>
                        </li>
                        <li>
                            <Link href='/service-details'>
                                <a>{t("game_types.mega.one_minute")}</a>
                            </Link>
                        </li> */}
                        <li><div className="coming_soon_mobile"><img src="/images/working.gif" className="coming_soon_icon" alt="working" /><a>{t("coming_soon")}</a></div></li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/blog'>{t("game_types.super_speed.caption")}</Link>
                    <ul className="subMenu">
                        {/* <li>
                            <Link href='/blog'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/blog-right-sidebar'>
                                <a>Hồ Chí Minh VIP</a>
                            </Link>
                        </li> */}
                        <li><div className="coming_soon_mobile"><img src="/images/working.gif" className="coming_soon_icon" alt="working" /><a>{t("coming_soon")}</a></div></li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/blog'>{t("game_types.south.caption")}</Link>
                    <ul className="subMenu">
                        {/* <li>
                            <Link href='/blog'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/blog-right-sidebar'>
                                <a>Hồ Chí Minh VIP</a>
                            </Link>
                        </li> */}
                        <li><div className="coming_soon_mobile"><img src="/images/working.gif" className="coming_soon_icon" alt="working" /><a>{t("coming_soon")}</a></div></li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/blog'>{t("game_types.central.caption")}</Link>
                    <ul className="subMenu">
                        {/* <li>
                            <Link href='/blog'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/blog-right-sidebar'>
                                <a>Hồ Chí Minh VIP</a>
                            </Link>
                        </li> */}
                        <li><div className="coming_soon_mobile"><img src="/images/working.gif" className="coming_soon_icon" alt="working" /><a>{t("coming_soon")}</a></div></li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/northern/northern-lottery'><a>{t("game_types.northern.caption")}</a></Link>
                    <ul className="subMenu">
                        <li>
                            <Link href='/northern/northern-lottery' onClick={() => {props.closeMenu()}}><a>{t("game_types.northern.northern")}</a></Link>
                        </li>
                        <li><div className="coming_soon_mobile"><img src="/images/working.gif" className="coming_soon_icon" alt="working" /><a>{t("coming_soon")}</a></div></li>
                        {/* <li>
                            <Link href='/northern/special-18h25'><a>{t("game_types.northern.special")}</a></Link>
                        </li> */}
                        <li><div className="coming_soon_mobile"><img src="/images/working.gif" className="coming_soon_icon" alt="working" /><a>{t("coming_soon")}</a></div></li>
                        {/* <li>
                            <Link href='/northern/scratch-lottery'><a>{t("game_types.northern.scratch")}</a></Link>
                        </li> */}
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    {
                        COUNTRIES.map((element, index) => {
                            if(element.code === i18n.language) {
                                return <div style={{color: "white"}} key={`SELECTED_LANGUAGE_ENTRY_${index}`}>
                                    <ReactCountryFlag
                                        countryCode={element.iconName}
                                        svg
                                        style={{
                                            width: '1.5em',
                                            height: '1.5em',
                                        }}
                                        title={element.iconName}
                                    /> {element.name}
                                </div>
                            } 
                            return null;
                            
                        })
                    }
                    <ul className="subMenu">
                        {
                            COUNTRIES.map((e, index) => (
                                <li key={`LANGUAGE_ENTRY_${index}`}>
                                    <div className={i18n.language === e.code ? "language_button selected" : "language_button"} onClick={() => {setLanguage(e.code)}}>
                                        <ReactCountryFlag
                                            className="flag"
                                            countryCode={e.iconName}
                                            svg
                                            style={{
                                                width: '1.5em',
                                                height: '1.5em',
                                            }}
                                            title={e.iconName}
                                        />
                                        {e.name}
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </li>
                <li>
                {!authenticated ? (
                    <Link href="/auth/login" className="date_text">
                        <a className="date_text"><LoginIcon /></a>
                    </Link>
                    ) : (
                    <div style={{ display: "flex" }}>
                        {/* <img src="/images/user.png" style={{ width: 20, height: 20 }} /> */}
                        <UserIcon />
                        <p className="date_text">{user?.balance}</p>
                        <Button onClick={() => {dispatch(logout(router))}}>
                        <LogoutIcon />
                        </Button>
                    </div>
                    )}
                </li>
            </ul>
        </nav>
    )
};

export default MobileNavMenu;