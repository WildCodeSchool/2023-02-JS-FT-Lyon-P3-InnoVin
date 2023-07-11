import { Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import styles from "./Presentation.module.css";
import logo from "../assets/logo.svg";
import illu from "../assets/presentation_illu.png";

export default function Presentation() {
  const navigate = useNavigate();

  const style = {
    button: {
      p: 2,
      width: 0.3,
      minWidth: "140px",
      maxWidth: "350px",
      borderRadius: 2,
    },
  };

  return (
    <div className={styles.pres}>
      <header
        className={styles.header}
        style={{ backgroundImage: `url(${illu})` }}
      >
        <img src={logo} alt="logo Inovin" />
      </header>
      <Stack
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        sx={{ width: 1, height: 0.75 }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
            textAlign: "center",
          }}
        >
          Bienvenue à l'atelier Inovin
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: 0.7,
            fontSize: "calc(0.75rem + 1vmin)",
            overflow: "auto",
          }}
        >
          Bienvenue dans notre application d'accompagnement pour l'atelier de
          dégustation de vins !<br /> Découvrez un voyage sensoriel unique où
          chaque note compte. <br /> <br />
          Après avoir évalué chaque vin dégusté, vous recevrez une fiche recette
          personnalisée mettant en valeur trois vins sélectionnés spécialement
          pour vous. Ensuite, participez à notre atelier de création de mélanges
          pour composer votre propre chef-d'œuvre œnologique et repartez avec
          une bouteille unique, créée selon vos goûts.
          <br /> <br />
          Laissez-vous guider par notre application pour une expérience
          inoubliable.
        </Typography>
        <Stack
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ width: 1 }}
        >
          <Button
            variant="contained"
            size="large"
            sx={style.button}
            onClick={() => navigate("/register")}
          >
            <Typography
              variant="button"
              sx={{ fontSize: "calc(10px + 1vmin)" }}
            >
              S'inscrire
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={style.button}
            onClick={() => navigate("/login")}
          >
            <Typography
              variant="button"
              sx={{ fontSize: "calc(10px + 1vmin)" }}
            >
              Se connecter
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
