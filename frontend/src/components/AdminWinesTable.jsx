import { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  gridClasses,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { useAdminContext } from "../contexts/AdminContext";
// --- Services ---
import WineService from "../services/WineService";
import GrapeService from "../services/GrapeService";
import TypeService from "../services/TypeService";
import AromaService from "../services/AromaService";
import FlavourService from "../services/FlavourService";
import DomainService from "../services/DomainService";
import RegionService from "../services/RegionService";
import CountryService from "../services/CountryService";

export default function AdminWinesTable() {
  const {
    winesData,
    setWinesData,
    grapesData,
    setGrapesData,
    typesData,
    setTypesData,
    aromasData,
    setAromasData,
    flavoursData,
    setFlavoursData,
    domainsData,
    setDomainsData,
    regionsData,
    setRegionsData,
    countriesData,
    setCountriesData,
  } = useAdminContext();

  const [rowModesModel, setRowModesModel] = useState({});

  // --- Fetch des données au montage du composant ---
  useEffect(() => {
    async function fetch() {
      try {
        const wine = await WineService.getWines();
        setWinesData(wine.data);
        const grape = await GrapeService.getGrapes();
        setGrapesData(grape.data);
        const type = await TypeService.getTypes();
        setTypesData(type.data);
        const aroma = await AromaService.getAromas();
        setAromasData(aroma.data);
        const flavour = await FlavourService.getFlavours();
        setFlavoursData(flavour.data);
        const domain = await DomainService.getDomains();
        setDomainsData(domain.data);
        const region = await RegionService.getRegions();
        setRegionsData(region.data);
        const country = await CountryService.getCountries();
        setCountriesData(country.data);
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
  }, []);

  // --- Personnalisation du header des colonnes ---
  const StripedWinesDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.secondary.light,
    },
  }));

  // --- Déclaration des valeurs des selects ---
  const grapeSelect = grapesData.map((grape) => ({
    value: grape.id,
    label: grape.name,
  }));
  const typeSelect = typesData.map((type) => ({
    value: type.id,
    label: type.name,
  }));
  const aromaSelect = aromasData.map((aroma) => ({
    value: aroma.id,
    label: aroma.name,
  }));
  const flavourSelect = flavoursData.map((flavour) => ({
    value: flavour.id,
    label: flavour.name,
  }));
  const domainSelect = domainsData.map((domain) => ({
    value: domain.id,
    label: domain.name,
  }));
  const regionSelect = regionsData.map((region) => ({
    value: region.id,
    label: region.name,
  }));
  const countrySelect = countriesData.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  // --- Gestion de l'édition des champs ---
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setWinesData(winesData.filter((wine) => wine.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, e) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      e.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      const updatedWine = await WineService.updateWine(newRow);
      console.info(updatedWine);
    } catch (err) {
      console.error("Update failed");
    }
  };

  const onProcessRowUpdateError = (error) => {
    console.error(error);
  };

  // --- Définition des colonnes ---
  const columnsWines = [
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerName: "Vin",
      width: 150,
      editable: true,
    },
    {
      field: "country_id",
      headerClassName: "super-app-theme--header",
      type: "singleSelect",
      valueOptions: countrySelect,
      headerName: "Pays",
      width: 150,
      editable: true,
    },
    {
      field: "region_id",
      headerClassName: "super-app-theme--header",
      headerName: "Région",
      type: "singleSelect",
      valueOptions: regionSelect,
      width: 150,
      editable: true,
    },
    {
      field: "domain_id",
      headerClassName: "super-app-theme--header",
      headerName: "Domaine",
      type: "singleSelect",
      valueOptions: domainSelect,
      width: 200,
      editable: true,
    },
    {
      field: "type_id",
      headerClassName: "super-app-theme--header",
      headerName: "Type",
      type: "singleSelect",
      valueOptions: typeSelect,
      width: 150,
      editable: true,
    },
    {
      field: "grape_variety_id",
      headerClassName: "super-app-theme--header",
      headerName: "Cépage",
      type: "singleSelect",
      valueOptions: grapeSelect,
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
      field: "aroma_id",
      headerClassName: "super-app-theme--header",
      headerName: "Arôme",
      type: "singleSelect",
      valueOptions: aromaSelect,
      width: 200,
      editable: true,
    },
    {
      field: "flavour_id",
      headerClassName: "super-app-theme--header",
      headerName: "Saveur",
      type: "singleSelect",
      valueOptions: flavourSelect,
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerClassName: "super-app-theme--header",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
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
    <StripedWinesDataGrid
      rows={winesData}
      columns={columnsWines}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={onProcessRowUpdateError}
      sx={{ backgroundColor: "text.primary", color: "background.default" }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
    />
  );
}
