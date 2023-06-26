import axios from "axios";
import { useEffect } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useAdminContext } from "../contexts/AdminContext";

export default function AdminUsersTable() {
  const { usersData, setUsersData } = useAdminContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((response) => setUsersData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const StripedUsersDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.secondary.light,
    },
  }));

  const columnsUsers = [
    {
      field: "firstname",
      headerClassName: "super-app-theme--header",
      headerName: "Prénom",
      width: 150,
      editable: true,
    },
    {
      field: "lastname",
      headerClassName: "super-app-theme--header",
      headerName: "Nom",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerClassName: "super-app-theme--header",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "birthdate",
      headerClassName: "super-app-theme--header",
      headerName: "Date de naissance",
      width: 150,
      editable: true,
    },
    {
      field: "address",
      headerClassName: "super-app-theme--header",
      headerName: "Adresse",
      width: 150,
      editable: true,
    },
    {
      field: "city",
      headerClassName: "super-app-theme--header",
      headerName: "Ville",
      width: 150,
      editable: true,
    },
    {
      field: "role",
      headerClassName: "super-app-theme--header",
      headerName: "Rôle",
      width: 150,
      editable: true,
    },
    {
      field: "aroma",
      headerClassName: "super-app-theme--header",
      headerName: "Arôme pref",
      width: 150,
      editable: true,
    },
    {
      field: "flavour",
      headerClassName: "super-app-theme--header",
      headerName: "Saveur pref",
      width: 150,
      editable: true,
    },
    {
      field: "type",
      headerClassName: "super-app-theme--header",
      headerName: "Type pref",
      width: 150,
      editable: true,
    },
  ];

  return (
    <StripedUsersDataGrid
      rows={usersData}
      columns={columnsUsers}
      editMode="row"
      sx={{ backgroundColor: "text.primary", color: "background.default" }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
    />
  );
}
