import { useCallback, useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import { Cancel, Delete, Edit, Save, Settings } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Button, SpeedDial, SpeedDialAction } from "@mui/material";
import { ToastContainer } from "react-toastify";
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
import SearchBar from "./SearchBar";
import CountryModal from "./CountryModal";
import RegionModal from "./RegionModal";
import DomainModal from "./DomainModal";
import GrapeModal from "./GrapeModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function AdminWinesTable() {
  const {
    query,
    setQuery,
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
    successToastTemplate,
    errorToastTemplate,
  } = useAdminContext();

  const idToDelete = useRef();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    data: "",
  });

  // --- Fetch des données au montage du composant ---
  useEffect(() => {
    async function fetch() {
      try {
        const wine = await WineService.getWines();
        setWinesData(wine.data.reverse());
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

  const winesDataUpdate = async () => {
    try {
      const wine = await WineService.getWines();
      setWinesData(wine.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  // --- Ouverture de la modal ---
  const handleOpenModal = (e) =>
    setOpenModal({
      isOpen: true,
      data: e.target.textContent,
    });

  // --- Fermeture de la modal ---
  const handleCloseModal = () => {
    setOpenModal({
      isOpen: false,
      data: "",
    });
    setQuery("");
  };

  // Va chercher le vin supprimé
  const deletedWine = winesData.filter(
    (wine) => wine.id === idToDelete.current
  );

  // Gère l'ouverture de la modal de confirmation du delete
  const handleDeleteModal = (id) => {
    idToDelete.current = id;
    setConfirmDelete(!confirmDelete);
  };

  // --- Gestion de la suppression ---
  const handleDeleteClick = async () => {
    try {
      // Supprime le vin de la BDD
      await WineService.deleteWine(idToDelete.current);
      // Met le state winesData à jour après la suppression
      winesDataUpdate();
      successToastTemplate(`${deletedWine[0].name} a été supprimé`);
      setConfirmDelete(!confirmDelete);
      idToDelete.current = "";
    } catch (err) {
      console.error("Deletion failed :", err);
      errorToastTemplate("Une erreur s'est produite");
    }
  };

  // --- Gestion de l'ajout ---
  const handleAddClick = () => {
    // Check si une nouvelle n'est pas déjà présente
    if (!winesData.some((wine) => typeof wine.id === "string")) {
      // Génère un id temporaire en string le temps d'insérer les nouvelles données
      const id = `new`;
      // Crée un nouvel objet dans le state winesData pour stocker les nouvelles données
      setWinesData((wines) => [
        {
          id,
          name: "",
          country_id: "",
          region_id: "",
          domain_id: "",
          type_id: "",
          grape_variety_id: "",
          vintage: "",
          aroma_id: "",
          flavour_id: "",
          isNew: true,
        },
        ...wines,
      ]);
      // Passe la nouvelle ligne en mode édition
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    }
  };

  // --- Gestion de l'édition ---
  const handleEditClick = (id) => () => {
    // Passe la ligne en mode édition
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    // Remet la ligne en mode "view" et déclenche le processRowUpdate
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    // Si on cancel un ajout, ça le vire du state car il n'a pas encore été entré dans la DB
    if (typeof id === "string") {
      setWinesData(winesData.filter((wine) => wine.id !== id));
      return;
    }
    // Sinon, remet la ligne en mode "view" et ignore les éventuelles modifs
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  // --- Gestion de l'update des données ---
  const handleRowModesModelChange = (newRowModesModel) => {
    // S'occupe de mettre à jour les modes des lignes lorsqu'elles changent entre "view" et "edit"
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, e) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      e.defaultMuiPrevented = true;
    }
  };

  // Check si le région correspond bien au pays et que le domaine correspond bien à la région
  const checkGeographicCoherence = (newRow) =>
    regionsData.filter((region) => region.id === newRow.region_id)[0]
      .country_id === newRow.country_id &&
    domainsData.filter((domain) => domain.id === newRow.domain_id)[0]
      .region_id === newRow.region_id;

  const processRowUpdate = useCallback(async (newRow) => {
    try {
      // Avant tout chose, validateurs
      await WineService.wineSchema.validate(newRow);
      if (checkGeographicCoherence(newRow)) {
        // Si c'est un ajout, l'id est une string et on utilise cette particularité pour déclencher un insert au lieu d'un update
        if (typeof newRow.id === "string") {
          // Post
          await WineService.addWine(newRow);
          // Refetch des données pour update le display
          winesDataUpdate();
          successToastTemplate(`${newRow.name} a bien été enregistré`);
          return newRow;
        }
        await WineService.updateWine(newRow);
        successToastTemplate(`${newRow.name} a bien été mis à jour`);
        return newRow;
      }
      return errorToastTemplate(
        "Le pays, la région et le domaine ne sont pas cohérents entre eux"
      );
    } catch (err) {
      console.error("Update failed", err);
      return errorToastTemplate(`${err}`.split(" ").slice(1).join(" "));
    }
  });

  const onProcessRowUpdateError = (error) => {
    console.error(error);
  };

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

  // --- Définition des colonnes ---
  const columnsWines = [
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerName: "Vin",
      width: 250,
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
              sx={{
                color: "secondary.main",
              }}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              sx={{
                color: "primary.main",
              }}
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
            onClick={() => handleDeleteModal(id)}
          />,
        ];
      },
    },
  ];

  // --- Filtre pour la recherche ---
  const winesDataFiltered = winesData.filter((wine) =>
    wine.name.toLowerCase().includes(query.toLowerCase())
  );

  // --- Défintion des actions pour le speed dial ---
  const actions = ["Pays", "Région", "Domaine", "Cépage"];

  return (
    <>
      <DeleteConfirmModal
        confirmDelete={confirmDelete}
        handleDeleteClick={handleDeleteClick}
        handleDeleteModal={handleDeleteModal}
        deletedElement={deletedWine}
      />
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
        <Button
          variant="contained"
          sx={{ width: 0.2, minWidth: 80, marginLeft: "50px" }}
          size="large"
          onClick={handleAddClick}
        >
          Ajouter
        </Button>
        <SpeedDial
          ariaLabel="settings"
          icon={<Settings fontSize="large" />}
          direction="down"
          sx={{ marginTop: "233px" }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action}
              icon={action}
              sx={{
                color: "white",
                borderRadius: 5,
                width: "100px",
              }}
              onClick={handleOpenModal}
            />
          ))}
        </SpeedDial>
        {openModal.data === "Pays" && (
          <CountryModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            countriesData={countriesData}
            setCountriesData={setCountriesData}
            winesDataUpdate={winesDataUpdate}
          />
        )}
        {openModal.data === "Région" && (
          <RegionModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            regionsData={regionsData}
            setRegionsData={setRegionsData}
            winesDataUpdate={winesDataUpdate}
            countrySelect={countrySelect}
          />
        )}
        {openModal.data === "Domaine" && (
          <DomainModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            domainsData={domainsData}
            setDomainsData={setDomainsData}
            winesDataUpdate={winesDataUpdate}
            regionSelect={regionSelect}
          />
        )}
        {openModal.data === "Cépage" && (
          <GrapeModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            grapesData={grapesData}
            setGrapesData={setGrapesData}
            winesDataUpdate={winesDataUpdate}
          />
        )}
      </Box>
      <DataGrid
        rows={!query ? winesData : winesDataFiltered}
        columns={columnsWines}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
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
