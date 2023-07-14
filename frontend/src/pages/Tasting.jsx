import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Tasting.module.css";
import pic from "../assets/pic.png";
import logo from "../assets/logo.svg";
import { useUserContext } from "../contexts/UserContext";
import { useSessionContext } from "../contexts/SessionContext";

export default function Tasting() {
  const style = {
    button: {
      p: 2,
      width: "75%",
      borderRadius: 2,
      fontFamily: "EB Garamond",
      "&.Mui-disabled": {
        background: "#FFFDCC",
        color: "grey",
      },
      height: { md: "8.5vh" },
    },
    griditem: {
      display: "flex",
      justifyContent: "center",
    },
  };

  const { setUserPick, userWines, setPreferredWines } = useUserContext();
  const { sessionWines, sessionGrapes } = useSessionContext();
  const navigate = useNavigate();
  const uncompleteTasting = userWines.some(
    (element) => element.isRated === false
  );

  if (userWines.length === 0) {
    for (let i = 0; i < sessionWines.length; i += 1) {
      userWines.push({
        ...sessionWines[i],
        ...sessionGrapes[i],
        isRated: false,
        tastingNote: null,
      });
    }
  }

  useEffect(() => {
    if (!uncompleteTasting) {
      setPreferredWines(
        userWines.sort((a, b) => b.tastingNote - a.tastingNote).slice(0, 3)
      );
    }
  }, []);

  const handleClickWine = (event) => {
    setUserPick(event.target.value);
    navigate("/tasting/tastingsheet");
  };
  const handleClickProfile = () => {
    navigate("/tasting/tastingprofile");
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
      <Box
        sx={{
          display: { md: "flex" },
          justifyContent: { md: "space-evenly" },
          height: { md: "65vh" },
        }}
      >
        <Box>
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              rowSpacing={3}
              sx={{
                "&.MuiGrid-container": {
                  width: { xs: "65vw", md: "25vw" },
                  margin: "auto",
                  mb: "2.5rem",
                },
              }}
            >
              <Grid item xs={6} md={12} sx={style.griditem}>
                <Button
                  onClick={handleClickWine}
                  disabled={userWines[0].isRated}
                  variant="contained"
                  value={0}
                  size="large"
                  sx={style.button}
                >
                  {" "}
                  Vin 1{" "}
                </Button>
              </Grid>
              <Grid item xs={6} md={12} sx={style.griditem}>
                <Button
                  onClick={handleClickWine}
                  disabled={userWines[1].isRated}
                  variant="contained"
                  value={1}
                  size="large"
                  sx={style.button}
                >
                  {" "}
                  Vin 2{" "}
                </Button>
              </Grid>
              <Grid item xs={6} md={12} sx={style.griditem}>
                <Button
                  onClick={handleClickWine}
                  disabled={userWines[2].isRated}
                  variant="contained"
                  size="large"
                  value={2}
                  sx={style.button}
                >
                  {" "}
                  Vin 3{" "}
                </Button>
              </Grid>
              <Grid item xs={6} md={12} sx={style.griditem}>
                <Button
                  onClick={handleClickWine}
                  disabled={userWines[3].isRated}
                  variant="contained"
                  size="large"
                  value={3}
                  sx={style.button}
                >
                  {" "}
                  Vin 4{" "}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: { md: "flex" },
            flexDirection: { md: "column" },
            maxWidth: { md: "55vw" },
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              height: "30dvh",
              width: "45dvw",
              margin: "auto",
              mb: { xs: "3rem", md: "0rem" },
            }}
          >
            <img className={styles.tastingPic} src={pic} alt="winePic" />
          </Box>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "secondary.main",
              width: { xs: "80vw", md: "40vw" },
              margin: "auto",
              mb: "3rem",
            }}
          >
            {" "}
            Après avoir dégusté vos 4 vins, vous aurez accès à votre profil de
            dégustation
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        size="large"
        disabled={uncompleteTasting}
        onClick={handleClickProfile}
        sx={{
          p: 2,
          margin: "0 auto",
          display: "flex",
          width: { xs: "40vw", md: "25vw" },
          fontFamily: "Gill Sans",
          borderRadius: 2,
          marginTop: { md: "1.5rem" },
          "&.Mui-disabled": {
            background: "#FFFDCC",
            color: "grey",
            fontFamily: "Gill Sans",
          },
        }}
      >
        {" "}
        Afficher mon profil <br /> de dégustation{" "}
      </Button>
    </div>
  );
}
