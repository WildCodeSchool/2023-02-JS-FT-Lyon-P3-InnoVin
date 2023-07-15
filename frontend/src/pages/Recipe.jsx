import "./Recipe.css";
import { Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ReactSlider from "react-slider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Tooltip from "../components/Tooltip";
import info from "../assets/info.svg";
import "react-toastify/dist/ReactToastify.css";
import winebottle from "../assets/winebottle.svg";
import { useUserContext } from "../contexts/UserContext";
import APIService from "../services/APIService";
import { useSessionContext } from "../contexts/SessionContext";

export default function Recipe() {
  const [valueWine, setValueWine] = useState([50, 100]);
  const totalWine3 = valueWine[0] - 0;
  const totalWine2 = valueWine[1] - valueWine[0];
  const totalWine1 = 250 - valueWine[1];

  const { preferredWines } = useUserContext();
  const userContext = useUserContext();
  const sessionContext = useSessionContext();
  const navigate = useNavigate();
  const { logout } = useUserContext();

  const style = {
    button: {
      p: 2,
      width: 0.3,
      borderRadius: 2,
      marginBottom: 5,
      marginTop: 5,
    },
  };
  const [recipeName, setRecipeName] = useState("");
  const [isRecipeName, setIsRecipeName] = useState(false);
  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
    setIsRecipeName(event.target.value !== "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isRecipeName) {
      toast.error("Veuillez entrer un nom pour la recette !");
    } else {
      const recipeData = {
        user_id: userContext.user.id,
        session_id: sessionContext.sessionId,
        name: recipeName,
      };

      if (!recipeData.user_id || !recipeData.session_id) {
        toast.error(
          "Les informations d'utilisateur ou de session sont manquantes !"
        );
      } else {
        try {
          await APIService.post(`/recipe`, recipeData);
          toast.success("recette postée!");

          const handleLogout = () => {
            logout();
            toast.success("Déconnexion réussie !");
            navigate("/login");
          };

          handleLogout();
        } catch (error) {
          toast.error(
            "Une erreur s'est produite lors de l'enregistrement des vins de la recette !"
          );
          console.error(error);
        }
      }
    }
  };
  /* eslint-disable */

  {
    /*
          const response = await axios.get(`${apiBaseUrl}/recipes`);
          const recipes = response.data;
          const lastRecipe = recipes[recipes.length - 1];
          const lastRecipeId = lastRecipe.id;

          setRecipeId(lastRecipeId);
      
          console.log(response.data);
          console.log(lastRecipe);
          console.log(lastRecipeId);
          const wineData = [
            {
              recipe_id: lastRecipeId,
              wine_id: preferredWines[0].wineName,
              dosage: totalWine1,
            },
            {
              recipe_id: lastRecipeId,
              wine_id: preferredWines[1].wineName,
              dosage: totalWine2,
            },
            {
              recipe_id: lastRecipeId,              wine_id: preferredWines[2].wineName,
              dosage: totalWine3,
            },
          ];

          await APIService.post(`/recipehaswine`, wineData);
          toast.success("Votre recette a bien été enregistrée ! 👍", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } catch (error) {
          toast.error(
            "Une erreur s'est produite lors de l'enregistrement des vins de la recette !"
          );
          console.error(error); */
  }

  return (
    <>
      <Box flexDirection="row" display="flex" marginBottom="2rem">
        <img src={logo} alt="logo" />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "56vw",
            color: "secondary.main",
            fontSize: "calc(2.5rem + 1vmin)",
            fontFamily: "EB Garamond",
          }}
        >
          {" "}
          Création{" "}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "primary.contrastText",
            fontSize: "calc(2rem + 1vmin)",
          }}
        >
          {" "}
          Veuillez sélectionner les dosages{" "}
        </Typography>
      </Box>
      <div className="input-container">
        <input
          type="text"
          id="recipeName"
          placeholder="Nom de la recette"
          name="recipeName"
          onChange={handleRecipeNameChange}
        />
      </div>
      <div className="pageContainer">
        <div className="wineBottle">
          <img src={winebottle} alt="winebottle" />
        </div>

        <div className="slider-container">
          <ReactSlider
            className="vertical-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[50, 100]}
            max={250}
            min={0}
            ariaLabel={["Lowest thumb", "Top thumb"]}
            orientation="vertical"
            invert
            pearling
            minDistance={10}
            onChange={(value) => setValueWine(value)}
          />
        </div>

        <div className="vertical-slider-image">
          <div className="value-container">
            <p className="max-value">250mL</p>{" "}
          </div>
          <div className="value-container">
            <p className="min-value">0mL </p>{" "}
          </div>
        </div>
        <div className="totalWinesContainer">
          {preferredWines && preferredWines.length >= 3 && (
            <>
              <div className="tooltip-content">
                <ClickAwayListener>
                  <Tooltip
                    imageSrc={info}
                    aroma={preferredWines[0].aroma}
                    flavour={preferredWines[0].flavour}
                  />
                </ClickAwayListener>
                <p>
                  {preferredWines[0].grapeName} <br /> {totalWine1} mL
                </p>
              </div>
              <div className="tooltip-content">
                <ClickAwayListener>
                  <Tooltip
                    imageSrc={info}
                    aroma={preferredWines[1].aroma}
                    flavour={preferredWines[1].flavour}
                  />
                </ClickAwayListener>
                <p>
                  {preferredWines[1].grapeName} <br /> {totalWine2} mL
                </p>
              </div>
              <div className="tooltip-content">
                <ClickAwayListener>
                  <Tooltip
                    imageSrc={info}
                    aroma={preferredWines[2].aroma}
                    flavour={preferredWines[2].flavour}
                  />
                </ClickAwayListener>
                <p>
                  {preferredWines[2].grapeName} <br /> {totalWine3} mL
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="button-style">
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
      </div>
    </>
  );
}
