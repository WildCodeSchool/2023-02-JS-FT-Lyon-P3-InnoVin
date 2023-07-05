import { useEffect } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useAdminContext } from "../contexts/AdminContext";
import UserService from "../services/UserService";

export default function AdminUsersTable() {
  const { usersData, setUsersData } = useAdminContext();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await UserService.getUsers();
        setUsersData(response.data);
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
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
      field: "postcode",
      headerClassName: "super-app-theme--header",
      headerName: "Code postal",
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
