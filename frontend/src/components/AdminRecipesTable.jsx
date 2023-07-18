import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { ToastContainer } from "react-toastify";
import { useAdminContext } from "../contexts/AdminContext";
import SearchBar from "./SearchBar";
// --- Services ---
import RecipeService from "../services/RecipeService";

export default function AdminUsersTable() {
  const { query, recipeData, setRecipeData } = useAdminContext();

  // --- Fetch des données à display au montage du composant ---
  useEffect(() => {
    async function fetch() {
      try {
        const recipe = await RecipeService.getRecipes();
        console.info(recipe);
        setRecipeData(recipe.data);
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
  }, []);
  // --- Filtre pour la recherche ---
  const recipesDataFiltered = recipeData.filter((recipe) =>
    recipe.recipe_name.toLowerCase().includes(query.toLowerCase())
  );

  // --- Définition des colonnes ---
  const columnsRecipes = [
    {
      field: "user_name",
      headerClassName: "super-app-theme--header",
      headerName: "Utilisateur",
      width: 250,
    },
    {
      field: "session_date",
      headerClassName: "super-app-theme--header",
      headerName: "Date de la session",
      width: 200,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "recipe_name",
      headerClassName: "super-app-theme--header",
      headerName: "Nom de la recette",
      width: 200,
    },
    {
      field: "wine_info",
      headerClassName: "super-app-theme--header",
      headerName: "Vins (Dosage)",
      width: 600,
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: 1,
          maxWidth: "900px",
          height: 0.1,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBlock: "5vh",
        }}
      >
        <SearchBar />
      </Box>
      <DataGrid
        rows={!query ? recipeData : recipesDataFiltered}
        columns={columnsRecipes}
        getRowId={(row) => row.recipe_id}
        getRowClassName={() => `super-app-theme--row`}
        hideFooter
        sx={{
          backgroundColor: "text.primary",
          color: "background.default",
          "& .super-app-theme--header": {
            backgroundColor: "secondary.main",
          },
          "& .super-app-theme--row:nth-of-type(even)": {
            backgroundColor: "secondary.light",
          },
        }}
      />
      <ToastContainer />
    </>
  );
}
