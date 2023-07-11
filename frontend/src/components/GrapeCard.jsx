import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styles from "./GrapeCard.module.css";

export default function GrapeCard({ grapepicture, grapename, flavour, aroma }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      marginRight="8rem"
      marginBottom="4rem"
    >
      <img
        className={styles.grapepicture}
        src={grapepicture}
        alt="grapePicture"
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        paddingLeft="6rem"
      >
        <Typography
          color="white"
          fontSize="calc(1.5rem + 1vmin)"
          paddingBottom="1rem"
        >
          {grapename}
        </Typography>
        <Typography color="white" fontSize="calc(0.8rem + 1vmin)">
          {" "}
          Saveur : {flavour}
        </Typography>
        <Typography color="white" fontSize="calc(0.8rem + 1vmin)">
          {" "}
          Famille aromatique : {aroma}
        </Typography>
      </Box>
    </Box>
  );
}

GrapeCard.propTypes = {
  grapepicture: PropTypes.string.isRequired,
  grapename: PropTypes.string.isRequired,
  flavour: PropTypes.string.isRequired,
  aroma: PropTypes.string.isRequired,
};
