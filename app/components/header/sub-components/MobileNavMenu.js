import React from 'react';
import Link from 'next/link';

const MobileNavMenu = () => {
    return (
        <nav className='offcanvasNavigation' id='offcanvas-navigation'>
            <ul>
                <li className="menuItemHasChildren">
                    <Link href='/'><a>Xổ Số VIP</a></Link>
                    <ul className="subMenu">
                        <li>
                            <Link href='/service'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/service-details'>
                                <a>Hồ Chí Minh VIP</a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/service'><a>Mega 6/45</a></Link>
                    <ul className="subMenu">
                        <li>
                            <Link href='/service'><a>1 giây</a></Link>
                        </li>
                        <li>
                            <Link href='/service-details'>
                                <a>1 phút</a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/blog'>Siêu Tốc</Link>
                    <ul className="subMenu">
                        <li>
                            <Link href='/blog'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/blog-right-sidebar'>
                                <a>Hồ Chí Minh VIP</a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/blog'>Miền Nam</Link>
                    <ul className="subMenu">
                        <li>
                            <Link href='/blog'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/blog-right-sidebar'>
                                <a>Hồ Chí Minh VIP</a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/blog'>Miền Trung</Link>
                    <ul className="subMenu">
                        <li>
                            <Link href='/blog'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/blog-right-sidebar'>
                                <a>Hồ Chí Minh VIP</a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menuItemHasChildren">
                    <Link href='/blog'>Miền Bắc</Link>
                    <ul className="subMenu">
                        <li>
                            <Link href='/blog'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/blog-right-sidebar'>
                                <a>Hồ Chí Minh VIP</a>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
};

export default MobileNavMenu;