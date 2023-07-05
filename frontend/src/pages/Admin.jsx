import { Box } from "@mui/system";
import { Button } from "@mui/material";
import SearchBar from "../components/SearchBar";
import AdminNav from "../components/AdminNav";
import { useAdminContext } from "../contexts/AdminContext";
import AdminWinesTable from "../components/AdminWinesTable";
import AdminUsersTable from "../components/AdminUsersTable";

export default function Admin() {
  const { nav } = useAdminContext();

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
        {nav === "users" && <AdminUsersTable />}
        {nav === "wines" && <AdminWinesTable />}
      </Box>
    </div>
  );
}
