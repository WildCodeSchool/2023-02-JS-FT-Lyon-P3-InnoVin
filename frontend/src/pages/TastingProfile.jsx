import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useUserContext } from "../contexts/UserContext";
import GrapeCard from "../components/GrapeCard";

export default function TastingProfile() {
  const { preferredWines } = useUserContext();
  const navigate = useNavigate();
  const handleClick = () => navigate("/tasting/recipe");

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
          marginBottom: "2.5rem",
        }}
      >
        Les trois cépages qui vous correspondent le plus sont :
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="80vw"
        margin="auto"
      >
        {preferredWines.map((wine) => (
          <GrapeCard
            key={wine.wine_id}
            grapename={wine.grapename}
            grapepicture={wine.grapepicture}
            flavour={wine.flavour}
            aroma={wine.aroma}
          />
        ))}
        <Button
          variant="contained"
          size="large"
          onClick={handleClick}
          sx={{
            p: 2,
            margin: "0 auto",
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
      </Box>
    </div>
  );
}
