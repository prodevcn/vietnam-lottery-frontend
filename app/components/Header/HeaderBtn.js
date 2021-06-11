import Link from 'next/link';
import { IoIosMenu } from "react-icons/io";
import {AiFillDashboard} from 'react-icons/ai';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const HeaderBtn = () => {
    const triggerMobileMenu = () => {
        const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
        offcanvasMobileMenu.classList.add("active");
    };
    return (
        <div className="header-btn-wrapper">
            {/* <ul className="accounts d-none d-lg-flex">
                <li>
                    <Link href='/login-register'>Log in</Link>
                </li>
                <li className="active">
                    <Link href='/login-register'>Sign up</Link>
                </li>
            </ul> */}
            <div className="mobile-button-wrapper d-block d-lg-none text-right">
                <button
                    className="mobile-aside-button"
                    onClick={() => triggerMobileMenu()}
                >
                    <IoIosMenu />
                </button>
            </div>
        </div>
    );
};

export default HeaderBtn;