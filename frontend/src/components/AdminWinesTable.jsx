import { useEffect } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useAdminContext } from "../contexts/AdminContext";
import WineService from "../services/WineService";

export default function AdminWinesTable() {
  const { winesData, setWinesData } = useAdminContext();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await WineService.getWines();
        setWinesData(response.data);
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
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
      type: "singleSelect",
      valueOptions: ["France", "Suisse"],
      headerName: "Pays",
      width: 150,
      editable: true,
    },
    {
      field: "region",
      headerClassName: "super-app-theme--header",
      headerName: "Région",
      type: "singleSelect",
      valueOptions: ["Bordeaux", "Loire"],
      width: 150,
      editable: true,
    },
    {
      field: "domain",
      headerClassName: "super-app-theme--header",
      headerName: "Domaine",
      type: "singleSelect",
      valueOptions: ["Château Margaux"],
      width: 200,
      editable: true,
    },
    {
      field: "type",
      headerClassName: "super-app-theme--header",
      headerName: "Type",
      type: "singleSelect",
      valueOptions: ["Rouge", "Rosé", "Blanc"],
      width: 150,
      editable: true,
    },
    {
      field: "grape_variety",
      headerClassName: "super-app-theme--header",
      headerName: "Cépage",
      type: "singleSelect",
      valueOptions: ["Gamay", "Merlot"],
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
      field: "aroma",
      headerClassName: "super-app-theme--header",
      headerName: "Arôme",
      width: 200,
      editable: true,
    },
    {
      field: "flavour",
      headerClassName: "super-app-theme--header",
      headerName: "Saveur",
      type: "singleSelect",
      valueOptions: ["Sucré", "Amer", "Acide"],
      width: 150,
      editable: true,
    },
  ];

  const processRowUpdate = (newRow, oldRow) => {
    console.info(newRow, oldRow);
  };

  const onProcessRowUpdateError = (error) => {
    console.error(error);
  };

  return (
    <StripedWinesDataGrid
      rows={winesData}
      columns={columnsWines}
      editMode="row"
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={onProcessRowUpdateError}
      sx={{ backgroundColor: "text.primary", color: "background.default" }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
    />
  );
}
