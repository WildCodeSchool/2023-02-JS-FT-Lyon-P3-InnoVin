import {
  Typography,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Button,
} from "@mui/material";
import { useState } from "react";
import logo from "../assets/logo.svg";

export default function Degustation() {
  const [choices, setChoices] = useState("");
  const [rate, setRate] = useState(0);
  const style = {
    button: { p: 2, width: 0.3, borderRadius: 2 },
  };
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setChoices((choicesMaked) => [...choicesMaked, value]);
    } else {
      setChoices((choicesMaked) =>
        choicesMaked.filter((choice) => choice !== value)
      );
    }
  };
  const marks = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  const handleRate = (e, newRate) => {
    setRate(newRate);
  };
  const handleSubmit = () => {
    alert(choices);
    alert({ rate });
  };

  return (
    <>
      <Box flexDirection="row" display="flex" marginBottom="2rem">
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
          Fiche de dégustation{" "}
        </Typography>
      </Box>
      <Box flexDirection="column" display="flex" marginBottom="2rem">
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
          }}
        >
          {" "}
          Examen visuel{" "}
        </Typography>
        <Box flexDirection="row" display="flex">
          <Box flexDirection="column" display="flex" marginLeft="5rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "contrastText",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Couleur et nuance
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <FormControlLabel
                  value="Framboise"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Framboise"
                />
                <FormControlLabel
                  value="Cerise"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Cerise"
                />
                <FormControlLabel
                  value="Rubis"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Rubis"
                />
                <FormControlLabel
                  value="Pourpre"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Pourpre"
                />
                <FormControlLabel
                  value="Violet"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Violet"
                />
                <FormControlLabel
                  value="Grenat"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Grenat"
                />
                <FormControlLabel
                  value="Tuilé"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Tuilé"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  value="Jaune vert"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                        fontSize: "2rem",
                      }}
                    />
                  }
                  label="Jaune vert"
                />
                <FormControlLabel
                  value="Jaune paille"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Jaune paille"
                />
                <FormControlLabel
                  value="Or vert"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Or vert"
                />
                <FormControlLabel
                  value="Or jaune"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Or jaune"
                />
                <FormControlLabel
                  value="Roux"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Roux"
                />
                <FormControlLabel
                  value="Ambré"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Ambré"
                />
                <FormControlLabel
                  value="Doré"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Doré"
                />
              </FormGroup>
            </Box>
          </Box>

          <Box flexDirection="column" display="flex" marginLeft="5rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "contrastText",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Intensité de la couleur
            </Typography>
            <Box flexDirection="column" display="flex">
              <FormGroup>
                <FormControlLabel
                  value="Claire"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Claire"
                />
                <FormControlLabel
                  value="Moyenne"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Moyenne"
                />
                <FormControlLabel
                  value="Trouble"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Trouble"
                />
                <FormControlLabel
                  value="Opaque"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Opaque"
                />
              </FormGroup>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  color: "contrastText",
                  fontSize: "calc(1.5rem + 1vmin)",
                }}
              >
                {" "}
                Fluidité des larmes
              </Typography>
              <FormGroup>
                <FormControlLabel
                  value="Fines et fluides"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Fines et fluides"
                />
                <FormControlLabel
                  value="Larges et visqueuses"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Larges et visqueuses"
                />
              </FormGroup>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="column" display="flex" marginBottom="2rem">
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
          }}
        >
          {" "}
          Examen olfactif{" "}
        </Typography>
        <Box flexDirection="row" display="flex">
          <Box flexDirection="column" display="flex" marginLeft="5rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "contrastText",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              Intensité des arômes
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <FormControlLabel
                  value="Faible"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Faible"
                />
                <FormControlLabel
                  value="Moyenne"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Moyenne"
                />
                <FormControlLabel
                  value="Forte"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Forte"
                />
              </FormGroup>
            </Box>
          </Box>
          <Box flexDirection="column" display="flex" marginLeft="5rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "contrastText",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Familles aromatiques
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <FormControlLabel
                  value="Fruits"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Fruits"
                />
                <FormControlLabel
                  value="Fleurs"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Fleurs"
                />
                <FormControlLabel
                  value="Epices"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Epices"
                />
                <FormControlLabel
                  value="Empyreumatiques"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Empyreumatiques"
                />
              </FormGroup>

              <FormGroup>
                <FormControlLabel
                  value="Végétaux"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Végétaux"
                />
                <FormControlLabel
                  value="Animal"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Animal"
                />
                <FormControlLabel
                  value="Défauts"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Défauts"
                />
              </FormGroup>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="column" display="flex" marginBottom="2rem">
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
          }}
        >
          {" "}
          Examen gustatif{" "}
        </Typography>
        <Box flexDirection="row" display="flex">
          <Box flexDirection="column" display="flex" marginLeft="5rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "contrastText",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              Saveurs
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <FormControlLabel
                  value="Acidité"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Acidité"
                />
                <FormControlLabel
                  value="Amer"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Amer"
                />
                <FormControlLabel
                  value="Sucré"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Sucré"
                />
                <FormControlLabel
                  value="Gras"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Gras"
                />
                <FormControlLabel
                  value="Alcool"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Alcool"
                />
              </FormGroup>
            </Box>
          </Box>
          <Box flexDirection="column" display="flex" marginLeft="5rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "contrastText",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Structure
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <FormControlLabel
                  value="Léger"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Léger"
                />
                <FormControlLabel
                  value="Fluide"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Fluide"
                />
                <FormControlLabel
                  value="Charpenté"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Charpenté"
                />
              </FormGroup>
            </Box>
          </Box>

          <Box flexDirection="column" display="flex" marginLeft="5rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "contrastText",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Persistance aromatique
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <FormControlLabel
                  value="Courte"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Courte"
                />
                <FormControlLabel
                  value="Moyenne"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Moyenne"
                />
                <FormControlLabel
                  value="Persistante"
                  onChange={handleChange}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      style={{
                        color: "#FFFDCC",
                      }}
                    />
                  }
                  label="Persistante"
                />
              </FormGroup>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="column" display="flex" marginBottom="2rem">
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
          }}
        >
          {" "}
          Note globale personnelle{" "}
        </Typography>
        <Box
          flexDirection="column"
          display="flex"
          marginTop="2rem"
          alignItems="center"
        >
          <Slider
            sx={{ width: "75%", margin: "0 auto" }}
            aria-label="note globale"
            defaultValue={0}
            valueLabelDisplay="on"
            step={1}
            min={0}
            max={10}
            size="large"
            marks={marks}
            value={rate}
            onChange={handleRate}
          />
        </Box>
      </Box>
      <Box
        flexDirection="column"
        display="flex"
        marginBottom="5rem"
        alignItems="center"
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={style.button}
          onClick={handleSubmit}
        >
          <Typography variant="button" fontSize={24}>
            Valider{" "}
          </Typography>
        </Button>
      </Box>
    </>
  );
}
