import React from "react";
import { useTranslation } from "react-i18next";

const OddsTheme = (props) => {
  const { t } = useTranslation();

  return (
    <div className="__odd_theme">
      <div className="title_area">
        <p>{t("odds")}</p>
      </div>
      <div className="description_area">
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default OddsTheme;