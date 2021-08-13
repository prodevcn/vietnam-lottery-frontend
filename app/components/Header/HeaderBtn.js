import React from "react";
import { IoIosMenu } from "react-icons/io";

const HeaderBtn = () => {
  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
    offcanvasMobileMenu.classList.add("active");
  };
  return (
    <div className="header-btn-wrapper">
      <div className="mobile-button-wrapper d-block d-lg-none text-right">
        <button type="button" className="mobile-aside-button" onClick={() => triggerMobileMenu()}>
          <IoIosMenu />
        </button>
      </div>
    </div>
  );
};

export default HeaderBtn;