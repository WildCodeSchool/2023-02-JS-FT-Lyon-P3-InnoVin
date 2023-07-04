import { Typography, Box, FormGroup, Slider, Button } from "@mui/material";
import { useState } from "react";
import logo from "../assets/logo.svg";
import ControlLabel from "../components/ControlLabel";

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
      <Box
        flexDirection="column"
        display="flex"
        marginBottom="2rem"
        marginRight="2rem"
        marginLeft="2rem"
      >
        <Typography
          marginBottom="2rem"
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
          <Box flexDirection="column" display="flex">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "secondary.main",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Couleur et nuance
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <ControlLabel
                  value="Framboise"
                  onChange={handleChange}
                  label="Framboise"
                />
                <ControlLabel
                  value="Cerise"
                  onChange={handleChange}
                  label="Cerise"
                />
                <ControlLabel
                  value="Rubis"
                  onChange={handleChange}
                  label="Rubis"
                />
                <ControlLabel
                  value="Pourpre"
                  onChange={handleChange}
                  label="Pourpre"
                />
                <ControlLabel
                  value="Violet"
                  onChange={handleChange}
                  label="Violet"
                />
                <ControlLabel
                  value="Grenat"
                  onChange={handleChange}
                  label="Grenat"
                />
                <ControlLabel
                  value="Tuilé"
                  onChange={handleChange}
                  label="Tuilé"
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel
                  value="Jaune vert"
                  onChange={handleChange}
                  label="Jaune vert"
                />
                <ControlLabel
                  value="Jaune paille"
                  onChange={handleChange}
                  label="Jaune paille"
                />
                <ControlLabel
                  value="Or vert"
                  onChange={handleChange}
                  label="Or vert"
                />
                <ControlLabel
                  value="Or jaune"
                  onChange={handleChange}
                  label="Or jaune"
                />
                <ControlLabel
                  value="Roux"
                  onChange={handleChange}
                  label="Roux"
                />
                <ControlLabel
                  value="Ambré"
                  onChange={handleChange}
                  label="Ambré"
                />
                <ControlLabel
                  value="Doré"
                  onChange={handleChange}
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
                color: "secondary.main",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Intensité de la couleur
            </Typography>
            <Box flexDirection="column" display="flex">
              <FormGroup>
                <ControlLabel
                  value="Claire"
                  onChange={handleChange}
                  label="Claire"
                />
                <ControlLabel
                  value="Moyenne"
                  onChange={handleChange}
                  label="Moyenne"
                />
                <ControlLabel
                  value="Trouble"
                  onChange={handleChange}
                  label="Trouble"
                />
                <ControlLabel
                  value="Opaque"
                  onChange={handleChange}
                  label="Opaque"
                />
              </FormGroup>
              <Typography
                variant="h5"
                marginTop="1.5rem"
                sx={{
                  display: "flex",
                  color: "secondary.main",
                  fontSize: "calc(1.5rem + 1vmin)",
                }}
              >
                {" "}
                Fluidité des larmes
              </Typography>
              <FormGroup>
                <ControlLabel
                  value="Fines et fluides"
                  onChange={handleChange}
                  label="Fines et fluides"
                />
                <ControlLabel
                  value="Larges et visqueuses"
                  onChange={handleChange}
                  label="Larges et visqueuses"
                />
              </FormGroup>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        flexDirection="column"
        display="flex"
        marginBottom="2rem"
        marginLeft="2rem"
      >
        <Typography
          variant="h4"
          marginBottom="2rem"
          marginLeft="10rem"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
            width: "60%",
            borderTop: 1,
          }}
        >
          {" "}
          Examen olfactif{" "}
        </Typography>
        <Box flexDirection="row" display="flex">
          <Box flexDirection="column" display="flex">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "secondary.main",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              Intensité des arômes
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <ControlLabel
                  value="Faible"
                  onChange={handleChange}
                  label="Faible"
                />
                <ControlLabel
                  value="Moyenne"
                  onChange={handleChange}
                  label="Moyenne"
                />
                <ControlLabel
                  value="Forte"
                  onChange={handleChange}
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
                color: "secondary.main",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Familles aromatiques
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <ControlLabel
                  value="Fruits"
                  onChange={handleChange}
                  label="Fruits"
                />
                <ControlLabel
                  value="Fleurs"
                  onChange={handleChange}
                  label="Fleurs"
                />

                <ControlLabel
                  value="Epices"
                  onChange={handleChange}
                  label="Epices"
                />
                <ControlLabel
                  value="Empyreumatique"
                  onChange={handleChange}
                  label="Empyreutmatique"
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel
                  value="Végétaux"
                  onChange={handleChange}
                  label="Végétaux"
                />
                <ControlLabel
                  value="Animal"
                  onChange={handleChange}
                  label="Animal"
                />
                <ControlLabel
                  value="Défauts"
                  onChange={handleChange}
                  label="Défauts"
                />
              </FormGroup>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        flexDirection="column"
        display="flex"
        marginBottom="2rem"
        marginLeft="2rem"
        marginRight="1rem"
      >
        <Typography
          variant="h4"
          marginBottom="2rem"
          marginLeft="10rem"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
            width: "60%",
            borderTop: 1,
          }}
        >
          {" "}
          Examen gustatif{" "}
        </Typography>
        <Box flexDirection="row" display="flex">
          <Box flexDirection="column" display="flex">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "secondary.main",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              Saveurs
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <ControlLabel
                  value="Acidité"
                  onChange={handleChange}
                  label="Acidité"
                />
                <ControlLabel
                  value="Amer"
                  onChange={handleChange}
                  label="Amer"
                />
                <ControlLabel
                  value="Sucré"
                  onChange={handleChange}
                  label="Sucré"
                />
                <ControlLabel
                  value="Gras"
                  onChange={handleChange}
                  label="Gras"
                />
                <ControlLabel
                  value="Alcool"
                  onChange={handleChange}
                  label="Alcool"
                />
              </FormGroup>
            </Box>
          </Box>
          <Box flexDirection="column" display="flex" marginLeft="4rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "secondary.main",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Structure
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <ControlLabel
                  value="Léger"
                  onChange={handleChange}
                  label="Léger"
                />
                <ControlLabel
                  value="Fluide"
                  onChange={handleChange}
                  label="Fluide"
                />
                <ControlLabel
                  value="Charpenté"
                  onChange={handleChange}
                  label="Charpenté"
                />
              </FormGroup>
            </Box>
          </Box>

          <Box flexDirection="column" display="flex" marginLeft="4rem">
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                color: "secondary.main",
                fontSize: "calc(1.5rem + 1vmin)",
              }}
            >
              {" "}
              Persistance aromatique
            </Typography>
            <Box flexDirection="row" display="flex">
              <FormGroup>
                <ControlLabel
                  value="Courte"
                  onChange={handleChange}
                  label="Courte"
                />
                <ControlLabel
                  value="Moyenne"
                  onChange={handleChange}
                  label="Moyenne"
                />
                <ControlLabel
                  value="Persistante"
                  onChange={handleChange}
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
