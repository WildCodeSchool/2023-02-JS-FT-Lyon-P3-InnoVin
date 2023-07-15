import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import RegionService from "../services/RegionService";
import { useAdminContext } from "../contexts/AdminContext";
import SearchBar from "./SearchBar";

export default function RegionModal({
  openModal,
  handleCloseModal,
  regionsData,
  setRegionsData,
  winesDataUpdate,
  countrySelect,
}) {
  const { query } = useAdminContext();

  const [rowModesModel, setRowModesModel] = useState({});

  const regionsDataUpdate = async () => {
    try {
      const region = await RegionService.getRegions();
      setRegionsData(region.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRegionsData = regionsData.filter((region) =>
    region.name.toLowerCase().includes(query.toLowerCase())
  );

  // --- Gestion de la suppression ---
  const handleDeleteClick = (id) => async () => {
    try {
      // Va chercher le vin supprimé pour le toast
      const deletedRegion = regionsData.filter((region) => region.id === id);
      // Supprime le vin de la BDD
      await RegionService.deleteRegion(id);
      // Met le state regionsData à jour après la suppression
      regionsDataUpdate();
      winesDataUpdate();
      toast.success(`${deletedRegion[0].name} a été supprimé`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("Deletion failed :", err);
    }
  };

  // --- Gestion de l'ajout ---
  const handleAddClick = () => {
    // Génère un id temporaire en string le temps d'insérer les nouvelles données
    const id = `new${regionsData[regionsData.length - 1].id + 1}`;
    // Crée un nouvel objet dans le state regionsData pour stocker les nouvelles données
    setRegionsData((regions) => [
      {
        id,
        name: "",
        country_id: "",
        isNew: true,
      },
      ...regions,
    ]);
    // Passe la nouvelle ligne en mode édition
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
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
      setRegionsData(regionsData.filter((region) => region.id !== id));
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

  const processRowUpdate = useCallback(async (newRow) => {
    try {
      if (typeof newRow.id === "string") {
        // Si c'est un ajout, l'id est une string et on utilise cette particularité pour déclencher un insert au lieu d'un update
        await RegionService.addRegion(newRow);
        regionsDataUpdate();
        winesDataUpdate();
        toast.success(`${newRow.name} a bien été enregistré`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return newRow;
      }
      await RegionService.updateRegion(newRow);
      regionsDataUpdate();
      winesDataUpdate();
      toast.success(`${newRow.name} a bien été mis à jour`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return newRow;
    } catch (err) {
      return console.error("Update failed");
    }
  });

  const onProcessRowUpdateError = (error) => {
    console.error(error);
  };

  return (
    <Modal open={openModal.isOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "RGBA(32,32,32,0.95)",
          borderRadius: 1,
          width: "90vw",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "50px",
        }}
      >
        <IconButton
          aria-label="settings"
          color="primary"
          onClick={handleCloseModal}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <Cancel fontSize="large" />
        </IconButton>
        <Typography variant="h2" color="secondary.main" sx={{ mt: 5 }}>
          Régions
        </Typography>
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
            sx={{ width: 0.2, minWidth: 80 }}
            size="large"
            onClick={handleAddClick}
          >
            Ajouter
          </Button>
        </Box>
        <DataGrid
          rows={!query ? regionsData : filteredRegionsData}
          columns={[
            {
              field: "name",
              headerClassName: "super-app-theme--header",
              headerName: "Région",
              width: 250,
              editable: true,
            },
            {
              field: "country_id",
              headerClassName: "super-app-theme--header",
              headerName: "Pays",
              type: "singleSelect",
              valueOptions: countrySelect,
              width: 250,
              editable: true,
            },
            {
              field: "actions",
              headerClassName: "super-app-theme--header",
              headerName: "Actions",
              type: "actions",
              width: 150,
              getActions: ({ id }) => {
                const isInEditMode =
                  rowModesModel[id]?.mode === GridRowModes.Edit;

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
                    onClick={handleDeleteClick(id)}
                  />,
                ];
              },
            },
          ]}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={onProcessRowUpdateError}
          hideFooter
          sx={{
            backgroundColor: "text.primary",
            color: "background.default",
            minWidth: "38%",
            maxWidth: "90%",
          }}
        />
      </Box>
    </Modal>
  );
}

RegionModal.propTypes = {
  openModal: PropTypes.shape({
    isOpen: PropTypes.bool,
    data: PropTypes.string.isRequired,
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  regionsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      country_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  setRegionsData: PropTypes.func.isRequired,
  winesDataUpdate: PropTypes.func.isRequired,
  countrySelect: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
};