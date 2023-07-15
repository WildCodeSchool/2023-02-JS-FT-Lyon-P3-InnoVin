import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styles from "./GrapeCard.module.css";

export default function GrapeCard({
  wineName,
  grapePicture,
  grapeName,
  flavour,
  aroma,
  tastingNote,
  vintage,
}) {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: { xs: "row", md: "column" },
        marginRight: { xs: "3.8rem", md: "0rem" },
        textAlign: { md: "center" },
      }}
      justifyContent="flex-start"
      alignItems="center"
      marginBottom="3.3rem"
    >
      <img
        className={styles.grapepicture}
        src={grapePicture}
        alt="grapePicture"
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          paddingLeft: { xs: "6rem", md: "0rem" },
          width: { md: "300px" },
        }}
      >
        <Typography
          color="white"
          fontSize="calc(1.2rem + 1vmin)"
          paddingBottom="0.8rem"
        >
          {wineName} {wineName.length < 20 ? <br /> : null}
          {vintage}
        </Typography>
        <Typography color="white" fontSize="calc(0.8rem + 1vmin)">
          {" "}
          Cépage : {grapeName}
        </Typography>
        <Typography color="white" fontSize="calc(0.8rem + 1vmin)">
          {" "}
          Saveur : {flavour}
        </Typography>
        <Typography color="white" fontSize="calc(0.8rem + 1vmin)">
          {" "}
          Arôme : {aroma}
        </Typography>
        <Typography color="white" fontSize="calc(0.8rem + 1vmin)">
          {" "}
          Note attribuée : {tastingNote}
        </Typography>
      </Box>
    </Box>
  );
}

GrapeCard.propTypes = {
  grapePicture: PropTypes.string.isRequired,
  grapeName: PropTypes.string.isRequired,
  flavour: PropTypes.string.isRequired,
  aroma: PropTypes.string.isRequired,
  wineName: PropTypes.string.isRequired,
  tastingNote: PropTypes.number.isRequired,
  vintage: PropTypes.number.isRequired,
};
