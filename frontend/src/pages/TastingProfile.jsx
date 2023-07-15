import { Box, Typography, Button } from "@mui/material";
import logo from "../assets/logo.svg";
import { useUserContext } from "../contexts/UserContext";
import GrapeCard from "../components/GrapeCard";

export default function TastingProfile() {
  const { preferredWines } = useUserContext();
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
            fontSize: "calc(2rem + 1vmin)",
          }}
        >
          {" "}
          Profil de dégustation{" "}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "white",
          marginBottom: { xs: "2.5rem", md: "3.5rem" },
        }}
      >
        Les trois vins que vous avez le plus appréciés sont :
      </Typography>
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "80vw", md: "100vw" },
          marginBottom: { md: "2rem" },
        }}
        justifyContent="space-evenly"
        margin="auto"
      >
        {preferredWines.map((wine) => (
          <GrapeCard
            key={wine.wineId}
            tastingNote={wine.tastingNote}
            vintage={wine.vintage}
            wineName={wine.wineName}
            grapeName={wine.grapeName}
            grapePicture={wine.grapePicture}
            flavour={wine.flavour}
            aroma={wine.aroma}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{
          p: 2,
          margin: "auto",
          marginBottom: "3rem",
          display: "flex",
          width: "30vw",
          borderRadius: 2,
          fontSize: "calc(0.6rem + 1vmin)",
          color: "white",
        }}
      >
        {" "}
        Atelier de création{" "}
      </Button>
    </div>
  );
}
