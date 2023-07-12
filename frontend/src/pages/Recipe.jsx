import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactSlider from "react-slider";
import logo from "../assets/logo.svg";
import styles from "./Recipe.module.css";
import winebottle from "../assets/winebottle.svg";

export default function Recipe() {
  const [valueWine, setValueWine] = useState([50, 100]);

  const totalWine3 = valueWine[0] - 0;
  const totalWine2 = valueWine[1] - valueWine[0];
  const totalWine1 = 250 - valueWine[1];
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
      <div className={styles.pageContainer}>
        <img className={styles.wineBottle} src={winebottle} alt="winebottle" />

        <ReactSlider
          className={styles.verticalSlider}
          thumbClassName="example-thumb"
          trackClassName={styles.exampleTrack}
          defaultValue={[50, 100]}
          max={250}
          min={0}
          ariaLabel={["Lowest thumb", "Middle thumb", "Top thumb"]}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          orientation="vertical"
          invert
          pearling
          minDistance={10}
          onChange={(value) => setValueWine(value)}
        />

        <p>Vin 1 : {totalWine1}</p>
        <p>Vin 2 : {totalWine2}</p>
        <p>Vin 3 : {totalWine3}</p>
      </div>
    </>
  );
}
