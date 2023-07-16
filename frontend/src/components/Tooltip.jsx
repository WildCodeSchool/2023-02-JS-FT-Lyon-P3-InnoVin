import React, { useState } from "react";
import PropTypes from "prop-types";
import info from "../assets/info.svg";
import styles from "./Tooltip.module.css";

export default function Tooltip({ aroma, flavour }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <div className={styles.tooltipContainer}>
      <button
        type="button"
        className={styles.tooltipButton}
        onClick={handleTooltipToggle}
      >
        <img src={info} alt="" />
      </button>
      {isTooltipOpen && (
        <div className={styles.tooltip}>
          <span>Aromes : {aroma}</span>
          <span>Saveurs : {flavour}</span>
        </div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  aroma: PropTypes.string.isRequired,
  flavour: PropTypes.string.isRequired,
};
