import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SearchBar from "../components/SearchBar";
import AdminNav from "../components/AdminNav";

export default function Admin() {
  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.secondary.light,
    },
  }));

  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerClassName: "super-app-theme--header",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lastName",
      headerClassName: "super-app-theme--header",
      headerName: "Last name",
      flex: 1,
      editable: true,
    },
    {
      field: "age",
      headerClassName: "super-app-theme--header",
      headerName: "Age",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "fullName",
      headerClassName: "super-app-theme--header",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <AdminNav />
      <Box
        sx={{
          width: 1,
          maxWidth: "900px",
          height: 0.1,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <SearchBar />
        <Button variant="contained" sx={{ width: 0.2, minWidth: 80 }}>
          Ajouter
        </Button>
      </Box>
      <Box
        sx={{
          width: 0.9,
          maxWidth: "900px",
          height: 0.65,
          "& .super-app-theme--header": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        <StripedDataGrid
          rows={rows}
          columns={columns}
          sx={{ backgroundColor: "text.primary", color: "background.default" }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>
    </div>
  );
}
