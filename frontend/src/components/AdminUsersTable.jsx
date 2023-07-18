import { useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import { useAdminContext } from "../contexts/AdminContext";
import SearchBar from "./SearchBar";
// --- Services ---
import UserService from "../services/UserService";

export default function AdminUsersTable() {
  const { query, usersData, setUsersData } = useAdminContext();

  // --- Fetch des données à display au montage du composant ---
  useEffect(() => {
    async function fetch() {
      try {
        const user = await UserService.getUsers();
        setUsersData(user.data);
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
  }, []);

  // --- Fonction pour mettre à jour le state usersData ---
  const usersDataUpdate = async () => {
    try {
      const user = await UserService.getUsers();
      setUsersData(user.data);
    } catch (error) {
      console.error(error);
    }
  };

  // --- Filtre pour la recherche ---
  const usersDataFiltered = usersData.filter(
    (user) =>
      user.firstname.toLowerCase().includes(query.toLowerCase()) ||
      user.lastname.toLowerCase().includes(query.toLowerCase())
  );

  // --- Gestion de la suppression ---
  const handleDeleteClick = (id) => async () => {
    try {
      // Va chercher le user supprimé pour le toast
      const deletedUser = usersData.filter((user) => user.id === id);
      // Supprime le user de la BDD
      await UserService.deleteUser(id);
      // Met le state usersData à jour après la suppression
      usersDataUpdate();
      toast.success(
        `${deletedUser[0].firstname} ${deletedUser[0].lastname} a été supprimé`,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (err) {
      console.error("Deletion failed :", err);
    }
  };

  // --- Définition des colonnes ---
  const columnsUsers = [
    {
      field: "firstname",
      headerClassName: "super-app-theme--header",
      headerName: "Prénom",
      width: 150,
    },
    {
      field: "lastname",
      headerClassName: "super-app-theme--header",
      headerName: "Nom",
      width: 150,
    },
    {
      field: "email",
      headerClassName: "super-app-theme--header",
      headerName: "Email",
      width: 200,
    },
    {
      field: "birthdate",
      headerClassName: "super-app-theme--header",
      headerName: "Date de naissance",
      type: "date",
      // Transforme les données reçu pour cette colonne en objets Date
      valueGetter: ({ value }) => value && new Date(value),
      width: 175,
    },
    {
      field: "address",
      headerClassName: "super-app-theme--header",
      headerName: "Adresse",
      width: 200,
    },
    {
      field: "postcode",
      headerClassName: "super-app-theme--header",
      headerName: "Code postal",
      width: 150,
    },
    {
      field: "city",
      headerClassName: "super-app-theme--header",
      headerName: "Ville",
      width: 150,
    },
    {
      field: "type",
      headerClassName: "super-app-theme--header",
      headerName: "Type favori",
      width: 150,
    },
    {
      field: "aroma",
      headerClassName: "super-app-theme--header",
      headerName: "Arôme favori",
      width: 200,
    },
    {
      field: "flavour",
      headerClassName: "super-app-theme--header",
      headerName: "Saveur favori",
      width: 150,
    },
    {
      field: "role",
      headerClassName: "super-app-theme--header",
      headerName: "Rôle",
      width: 100,
    },
    {
      field: "delete",
      headerClassName: "super-app-theme--header",
      headerName: "Supprimer",
      type: "actions",
      width: 100,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            sx={{
              color: "primary.main",
            }}
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
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
        rows={!query ? usersData : usersDataFiltered}
        columns={columnsUsers}
        hideFooter
        getRowClassName={() => `super-app-theme--row`}
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
