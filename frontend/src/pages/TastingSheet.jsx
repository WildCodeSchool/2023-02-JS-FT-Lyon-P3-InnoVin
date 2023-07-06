import { Typography, Box, FormGroup, Slider, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import logo from "../assets/logo.svg";
import ControlLabel from "../components/ControlLabel";

export default function TastingSheet() {
  const [rate, setRate] = useState(0);
  const navigate = useNavigate();
  const { tastedWines, setTastedWines, userPick } = useUserContext();

  const style = {
    button: {
      p: 2,
      width: 0.3,
      borderRadius: 2,
      marginBottom: 5,
      marginTop: 5,
    },
  };

  const marks = [
    {
      value: 0,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>0</Typography>,
    },
    {
      value: 1,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>1</Typography>,
    },
    {
      value: 2,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>2</Typography>,
    },
    {
      value: 3,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>3</Typography>,
    },
    {
      value: 4,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>4</Typography>,
    },
    {
      value: 5,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>5</Typography>,
    },
    {
      value: 6,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>6</Typography>,
    },
    {
      value: 7,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>7</Typography>,
    },
    {
      value: 8,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>8</Typography>,
    },
    {
      value: 9,
      label: <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>9</Typography>,
    },
    {
      value: 10,
      label: (
        <Typography sx={{ fontSize: 24, color: "#FFFDCC" }}>10</Typography>
      ),
    },
  ];

  const handleRate = (e, newRate) => {
    setRate(newRate);
  };
  const handleSubmit = () => {
    switch (userPick) {
      case "Wine 1":
        setTastedWines({
          ...tastedWines,
          wine1: { isDisabled: true, tastingNote: rate },
        });
        break;
      case "Wine 2":
        setTastedWines({
          ...tastedWines,
          wine2: { isDisabled: true, tastingNote: rate },
        });
        break;
      case "Wine 3":
        setTastedWines({
          ...tastedWines,
          wine3: { isDisabled: true, tastingNote: rate },
        });
        break;
      case "Wine 4":
        setTastedWines({
          ...tastedWines,
          wine4: { isDisabled: true, tastingNote: rate },
        });
        break;
      default:
    }

    navigate("/tasting");
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
                <ControlLabel value="Framboise" label="Framboise" />
                <ControlLabel value="Cerise" label="Cerise" />
                <ControlLabel value="Rubis" label="Rubis" />
                <ControlLabel value="Pourpre" label="Pourpre" />
                <ControlLabel value="Violet" label="Violet" />
                <ControlLabel value="Grenat" label="Grenat" />
                <ControlLabel value="Tuilé" label="Tuilé" />
              </FormGroup>

              <FormGroup>
                <ControlLabel value="Jaune vert" label="Jaune vert" />
                <ControlLabel value="Jaune paille" label="Jaune paille" />
                <ControlLabel value="Or vert" label="Or vert" />
                <ControlLabel value="Or jaune" label="Or jaune" />
                <ControlLabel value="Roux" label="Roux" />
                <ControlLabel value="Ambré" label="Ambré" />
                <ControlLabel value="Doré" label="Doré" />
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
                <ControlLabel value="Claire" label="Claire" />
                <ControlLabel value="Moyenne" label="Moyenne" />
                <ControlLabel value="Trouble" label="Trouble" />
                <ControlLabel value="Opaque" label="Opaque" />
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
                  label="Fines et fluides"
                />
                <ControlLabel
                  value="Larges et visqueuses"
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
            borderTop: 1,
            width: "80vw",
            marginLeft: "3rem",
            marginRight: "2rem",
            paddingTop: "1.5rem",
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
                <ControlLabel value="Faible" label="Faible" />
                <ControlLabel value="Moyenne" label="Moyenne" />
                <ControlLabel value="Forte" label="Forte" />
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
                <ControlLabel value="Fruits" label="Fruits" />
                <ControlLabel value="Fleurs" label="Fleurs" />

                <ControlLabel value="Epices" label="Epices" />
                <ControlLabel value="Empyreumatique" label="Empyreutmatique" />
              </FormGroup>

              <FormGroup>
                <ControlLabel value="Végétaux" label="Végétaux" />
                <ControlLabel value="Animal" label="Animal" />
                <ControlLabel value="Défauts" label="Défauts" />
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
            borderTop: 1,
            width: "80vw",
            marginLeft: "3rem",
            marginRight: "2rem",
            paddingTop: "1.5rem",
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
                <ControlLabel value="Acidité" label="Acidité" />
                <ControlLabel value="Amer" label="Amer" />
                <ControlLabel value="Sucré" label="Sucré" />
                <ControlLabel value="Gras" label="Gras" />
                <ControlLabel value="Alcool" label="Alcool" />
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
                <ControlLabel value="Léger" label="Léger" />
                <ControlLabel value="Fluide" label="Fluide" />
                <ControlLabel value="Charpenté" label="Charpenté" />
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
                <ControlLabel value="Courte" label="Courte" />
                <ControlLabel value="Moyenne" label="Moyenne" />
                <ControlLabel value="Persistante" label="Persistante" />
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            fontSize: "calc(2rem + 1vmin)",
            borderTop: 1,
            width: "80vw",
            marginLeft: "3rem",
            marginRight: "2rem",
            paddingTop: "1.5rem",
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
            sx={{
              width: "75%",
              margin: "0 auto",
              fontSize: "calc(2rem + 1vmin)",
            }}
            aria-label="note globale"
            defaultValue={5}
            valueLabelDisplay="off"
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
