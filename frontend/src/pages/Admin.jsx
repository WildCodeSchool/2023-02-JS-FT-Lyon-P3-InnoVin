import { Box } from "@mui/system";
import AdminNav from "../components/AdminNav";
import { useAdminContext } from "../contexts/AdminContext";
import AdminWinesTable from "../components/AdminWinesTable";
import AdminUsersTable from "../components/AdminUsersTable";
import AdminSessionsTable from "../components/AdminSessionsTable";

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
        {nav === "sessions" && <AdminSessionsTable />}
      </Box>
    </div>
  );
}
