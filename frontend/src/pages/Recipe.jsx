import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import styles from "./Recipe.module.css";
import winebottle from "../assets/winebottle.svg";

export default function Recipe() {
  const [wine1, setWine1] = useState(0);
  const [wine2, setWine2] = useState(0);
  const [wine3, setWine3] = useState(0);

  const handleChangeWine1 = (event) => {
    const wineValue = parseInt(event.target.value, 10);
    const total = wineValue + wine2 + wine3;
    if (total <= 250) {
      setWine1(wineValue);
    }
  };

  const handleChangeWine2 = (event) => {
    const wineValue = parseInt(event.target.value, 10);
    const total = wine1 + wineValue + wine3;
    if (total <= 250) {
      setWine2(wineValue);
    }
  };

  const handleChangeWine3 = (event) => {
    const wineValue = parseInt(event.target.value, 10);
    const total = wine1 + wine2 + wineValue;
    if (total <= 250) {
      setWine3(wineValue);
    }
  };

  return (
    <>
      <Box flexDirection="row" display="flex" marginBottom="2rem">
        <img src={logo} alt="logo" />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "56vw",
            color: "secondary.main",
            fontSize: "calc(2.5rem + 1vmin)",
          }}
        >
          {" "}
          Création{" "}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "primary.contrastText",
            fontSize: "calc(2rem + 1vmin)",
          }}
        >
          {" "}
          Veuillez rentrer les dosages{" "}
        </Typography>
      </Box>
      <img className={styles.wineBottle} src={winebottle} alt="winebottle" />
      <div className={styles.wineSliders}>
        <div className={styles.sliderContainer}>
          {" "}
          <p>Wine 1</p>
          <div className={styles.inputContainer}>
            <input
              type="range"
              min="0"
              max="250"
              value={wine1}
              onChange={handleChangeWine1}
              className="slider-horizontal"
            />
          </div>
          <div>{wine1} ml</div>
        </div>

        <div className={styles.sliderContainer}>
          <p>Wine 2</p>

          <div className={styles.inputContainer}>
            <input
              type="range"
              min="0"
              max="250"
              value={wine2}
              onChange={handleChangeWine2}
              className="slider-horizontal"
            />
          </div>
          <div>{wine2} ml</div>
        </div>

        <div className={styles.sliderContainer}>
          <p>Wine 3</p>

          <div className={styles.inputContainer}>
            <input
              type="range"
              min="0"
              max="250"
              value={wine3}
              onChange={handleChangeWine3}
              className="slider-horizontal"
            />
          </div>
          <div>{wine3} ml</div>
        </div>
      </div>
    </>
  );
}
