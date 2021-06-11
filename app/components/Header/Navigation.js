import Link from 'next/link';
import {IoCaretDown} from 'react-icons/io5';

const Navigation = () => {
    return (
        <nav className='mainmenu__nav'>
            <ul className='mainmenu'>
                <li className='drop'>
                    <Link href='/'>
                        <a> Xổ Số VIP <IoCaretDown color="red" /></a>
                    </Link>
                    <ul className="dropdown">
                        <li>
                            <Link href='/home-one'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
                        </li>
                    </ul>
                </li>
                <li className='drop'>
                    <Link href='/'>
                        <a>
                        Mega 6/45 <IoCaretDown color="red" />
                        </a>
                    </Link>
                    <ul className="dropdown">
                        <li>
                            <Link href='/home-one'><a>1 giây</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>1 phút</a></Link>
                        </li>
                    </ul>
                </li>
                <li className='drop'>
                    <Link href='/'>
                        <a>
                        Siêu Tốc <IoCaretDown color="red" />
                        </a>
                    </Link>
                    <ul className="dropdown">
                        <li>
                            <Link href='/home-one'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
                        </li>
                    </ul>
                </li>
                <li className='drop'>
                    <Link href='/'>
                        <a>
                        Miền Nam <IoCaretDown color="red" />
                        </a>
                    </Link>
                    <ul className="dropdown">
                        <li>
                            <Link href='/home-one'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
                        </li>
                    </ul>
                </li>
                <li className='drop'>
                    <Link href='/'>
                        <a>
                        Miền Trung <IoCaretDown color="red" />
                        </a>
                    </Link>
                    <ul className="dropdown">
                        <li>
                            <Link href='/home-one'><a>Hà Nội VIP</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Hồ Chí Minh VIP</a></Link>
                        </li>
                    </ul>
                </li>
                <li className='drop'>
                    <Link href='/'>
                        <a>
                        Miền Bắc <IoCaretDown color="red" />
                        </a>
                    </Link>
                    <ul className="dropdown">
                        <li>
                            <Link href='/home-one'><a>Xổ Số Miền Bắc</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Đặc Biệt 18h25</a></Link>
                        </li>
                        <li>
                            <Link href='/home-two'><a>Xổ số cào</a></Link>
                        </li>				
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;