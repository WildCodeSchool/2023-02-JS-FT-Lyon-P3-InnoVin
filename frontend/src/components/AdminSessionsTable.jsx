import { useEffect } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useAdminContext } from "../contexts/AdminContext";
import SessionService from "../services/SessionService";

export default function AdminSessionsTable() {
  const { sessionsData, setSessionsData } = useAdminContext();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await SessionService.getSessions();
        setSessionsData(response.data);
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
  }, []);

  const StripedSessionsDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.secondary.light,
    },
  }));

  const columnsSessions = [
    {
      field: "date",
      headerClassName: "super-app-theme--header",
      headerName: "Date",
      width: 150,
      editable: true,
    },
    {
      field: "time",
      headerClassName: "super-app-theme--header",
      headerName: "Horaires",
      width: 150,
      editable: true,
    },
  ];

  return (
    <StripedSessionsDataGrid
      rows={sessionsData}
      columns={columnsSessions}
      editMode="row"
      sx={{ backgroundColor: "text.primary", color: "background.default" }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
    />
  );
}
