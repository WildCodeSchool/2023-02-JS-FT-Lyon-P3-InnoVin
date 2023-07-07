import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Tasting.module.css";
import pic from "../assets/pic.png";
import logo from "../assets/logo.svg";
import { useUserContext } from "../contexts/UserContext";

export default function Tasting() {
  const style = {
    button: {
      p: 2,
      width: "60%",
      borderRadius: 2,
      fontFamily: "EB Garamond",
      "&.Mui-disabled": {
        background: "#FFFDCC",
        color: "grey",
      },
    },
    gridItem: {
      display: "flex",
      justifyContent: "center",
    },
  };

  const { setUserPick, tastedWines } = useUserContext();
  const navigate = useNavigate();
  const uncompleteTasting = Object.entries(tastedWines).some(
    (element) => element[1].tastingNote == null
  );
  const handleClick = (event) => {
    setUserPick(event.target.value);
    navigate("/tasting/tastingsheet");
  };

  return (
    <div>
      <Box flexDirection="row" display="flex" marginBottom="1rem">
        <img src={logo} alt="logo" />
        <Typography
          variant="h3"
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
          Dégustation{" "}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "secondary.main",
          marginBottom: "3.5rem",
        }}
      >
        Choisissez votre vin
      </Typography>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: "60vw", mb: "2.5rem" }}
      >
        <Grid item xs={6} sx={style.gridItem}>
          <Button
            onClick={handleClick}
            disabled={tastedWines.wine1.isDisabled}
            variant="contained"
            value="Wine 1"
            size="large"
            sx={style.button}
          >
            {" "}
            Vin 1{" "}
          </Button>
        </Grid>
        <Grid item xs={6} sx={style.gridItem}>
          <Button
            onClick={handleClick}
            disabled={tastedWines.wine2.isDisabled}
            variant="contained"
            value="Wine 2"
            size="large"
            sx={style.button}
          >
            {" "}
            Vin 2{" "}
          </Button>
        </Grid>
        <Grid item xs={6} sx={style.gridItem}>
          <Button
            onClick={handleClick}
            disabled={tastedWines.wine3.isDisabled}
            variant="contained"
            size="large"
            value="Wine 3"
            sx={style.button}
          >
            {" "}
            Vin 3{" "}
          </Button>
        </Grid>
        <Grid item xs={6} sx={style.gridItem}>
          <Button
            onClick={handleClick}
            disabled={tastedWines.wine4.isDisabled}
            variant="contained"
            size="large"
            value="Wine 4"
            sx={style.button}
          >
            {" "}
            Vin 4{" "}
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          height: "30dvh",
          width: "45dvw",
          margin: "auto",
          mb: "3rem",
        }}
      >
        <img className={styles.tastingPic} src={pic} alt="winePic" />
      </Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "secondary.main",
          width: "80vw",
          margin: "auto",
          mb: "3rem",
        }}
      >
        {" "}
        Après avoir dégusté vos 4 vins, vous aurez accès à votre profil de
        dégustation
      </Typography>
      <Button
        variant="contained"
        size="large"
        disabled={uncompleteTasting}
        sx={{
          p: 2,
          margin: "0 auto",
          display: "flex",
          width: "40dvw",
          borderRadius: 2,
          "&.Mui-disabled": {
            background: "#FFFDCC",
            color: "grey",
          },
        }}
      >
        {" "}
        Afficher mon profil <br /> de dégustation{" "}
      </Button>
    </div>
  );
}
