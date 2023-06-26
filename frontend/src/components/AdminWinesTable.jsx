import axios from "axios";
import { useEffect } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useAdminContext } from "../contexts/AdminContext";

export default function AdminWinesTable() {
  const { winesData, setWinesData } = useAdminContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/wines`)
      .then((response) => setWinesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const StripedWinesDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.secondary.light,
    },
  }));

  const columnsWines = [
    {
      field: "wine",
      headerClassName: "super-app-theme--header",
      headerName: "Vin",
      width: 150,
      editable: true,
    },
    {
      field: "country",
      headerClassName: "super-app-theme--header",
      headerName: "Pays",
      width: 150,
      editable: true,
    },
    {
      field: "region",
      headerClassName: "super-app-theme--header",
      headerName: "Région",
      width: 150,
      editable: true,
    },
    {
      field: "domain",
      headerClassName: "super-app-theme--header",
      headerName: "Domaine",
      description: "This column has a value getter and is not sortable.",
      width: 200,
      editable: true,
    },
    {
      field: "type",
      headerClassName: "super-app-theme--header",
      headerName: "Type",
      width: 150,
      editable: true,
    },
    {
      field: "grape_variety",
      headerClassName: "super-app-theme--header",
      headerName: "Cépage",
      width: 150,
      editable: true,
    },
    {
      field: "vintage",
      headerClassName: "super-app-theme--header",
      headerName: "Millésime",
      width: 150,
      editable: true,
    },
    {
      field: "aromas",
      headerClassName: "super-app-theme--header",
      headerName: "Arôme",
      width: 200,
      editable: true,
    },
    {
      field: "flavours",
      headerClassName: "super-app-theme--header",
      headerName: "Saveur",
      width: 150,
      editable: true,
    },
  ];

  return (
    <StripedWinesDataGrid
      rows={winesData}
      columns={columnsWines}
      editMode="row"
      sx={{ backgroundColor: "text.primary", color: "background.default" }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
    />
  );
}
