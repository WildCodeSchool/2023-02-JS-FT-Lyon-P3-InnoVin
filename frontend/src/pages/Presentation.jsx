import { Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import styles from "./Presentation.module.css";
import logo from "../assets/logo.svg";
import illu from "../assets/presentation_illu.png";

export default function Presentation() {
  const navigate = useNavigate();

  const style = {
    button: { p: 2, width: 0.3, borderRadius: 2 },
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
        <Typography variant="h2" sx={{ color: "secondary.main" }}>
          Bienvenue à l'atelier Inovin
        </Typography>
        <Typography variant="body1" fontSize={24} sx={{ width: 0.7 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor
          lobortis dolor nec interdum. Duis non porttitor nibh, nec malesuada
          justo. Aliquam placerat consectetur ullamcorper. Vestibulum ultrices
          enim dui, et eleifend turpis consectetur eu. Proin a blandit nisl.
          Proin efficitur urna arcu, nec eleifend eros imperdiet nec. Nunc
          malesuada lacus purus, vel mollis dolor volutpat eu. Cras vitae lorem
          placerat, cursus ex ut, rutrum arcu. Curabitur dictum tincidunt dolor,
          in efficitur libero. Sed sem neque, ultrices in gravida nec, viverra
          pulvinar ligula. Suspendisse dapibus egestas turpis eu consequat.
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
            <Typography variant="button" fontSize={24}>
              S'inscrire
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={style.button}
            onClick={() => navigate("/login")}
          >
            <Typography variant="button" fontSize={24}>
              Se connecter
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
