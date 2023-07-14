import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Tooltip.css";
import info from "../assets/info.svg";

export default function Tooltip({ aroma, flavour }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <div className="tooltip-container">
      <button
        type="button"
        className="tooltip-button"
        onClick={handleTooltipToggle}
      >
        <img src={info} alt="" />
      </button>
      {isTooltipOpen && (
        <div className="tooltip">
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
