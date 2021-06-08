import React, {useEffect} from 'react';
import {IoMdClose} from 'react-icons/io';
import MobileNavMenu from './sub-components/MobileNavMenu';

const MobileMenu = () => {
    useEffect(() => {
        const offCanvasNav = document.querySelector("#offcanvas-navigation");
        const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(`.subMenu`);
        const anchorLinks = offCanvasNav.querySelectorAll("a");

        for(let i=0; i < offCanvasNavSubMenu.length; i++) {
            offCanvasNavSubMenu[i].insertAdjacentHTML(
                'beforebegin',
                `<span class="menuExpand"><i></i></span>`
            );
        }

        const menuExpand = offCanvasNav.querySelectorAll(".menuExpand");
        const numMenuExpand = menuExpand.length;

        for (let i = 0; i < numMenuExpand; i++) {
            menuExpand[i].addEventListener("click", e => {
                sideMenuExpand(e);
            });
        }

        for (let i = 0; i < anchorLinks.length; i++) {
            anchorLinks[i].addEventListener("click", () => {
                closeMobileMenu();
            });
        }
    });
    const sideMenuExpand = e => {
        e.currentTarget.parentElement.classList.toggle("active");
    };
    
    const closeMobileMenu = () => {
        const offcanvasMobileMenu = document.querySelector(
            "#offcanvas-mobile-menu"
        );
        offcanvasMobileMenu.classList.remove("active");
    };

    return (
        <div className="offcanvasMobileMenu" id="offcanvas-mobile-menu">
            <button
                className="offcanvasMenuClose"
                id="mobile-menu-close-trigger"
                onClick={() => closeMobileMenu()}
            >
                <IoMdClose />
            </button>
            <div className="offcanvasWrapper">
                <div className="offcanvasInnerContent">
                {/* mobile search */}
                {/* <MobileMenuSearch /> */}

                {/* mobile nav menu */}
                <MobileNavMenu />

                {/* mobile widgets */}
                {/* <MobileWidgets /> */}
                </div>
            </div>
            </div>
    );
}

export default MobileMenu;