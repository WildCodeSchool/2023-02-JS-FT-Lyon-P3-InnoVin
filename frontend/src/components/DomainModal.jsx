import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import DomainService from "../services/DomainService";
import { useAdminContext } from "../contexts/AdminContext";
import SearchBar from "./SearchBar";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function DomainModal({
  openModal,
  handleCloseModal,
  domainsData,
  setDomainsData,
  winesDataUpdate,
  regionSelect,
}) {
  const { query, successToastTemplate, errorToastTemplate } = useAdminContext();

  const idToDelete = useRef();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});

  const domainsDataUpdate = async () => {
    try {
      const domain = await DomainService.getDomains();
      setDomainsData(domain.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filtre pour la recherche de domaine
  const filteredDomainsData = domainsData.filter((domain) =>
    domain.name.toLowerCase().includes(query.toLowerCase())
  );

  // Va chercher le pays supprimé
  const deletedDomain = domainsData.filter(
    (domain) => domain.id === idToDelete.current
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
      await DomainService.deleteDomain(idToDelete.current);
      // Met le state domainsData à jour après la suppression
      domainsDataUpdate();
      winesDataUpdate();
      successToastTemplate(`${deletedDomain[0].name} a été supprimé`);
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
    if (!domainsData.some((domain) => typeof domain.id === "string")) {
      // Génère un id temporaire en string le temps d'insérer les nouvelles données
      const id = `new`;
      // Crée un nouvel objet dans le state domainsData pour stocker les nouvelles données
      setDomainsData((domains) => [
        {
          id,
          name: "",
          region_id: "",
          isNew: true,
        },
        ...domains,
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
      setDomainsData(domainsData.filter((domain) => domain.id !== id));
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
      // Avant tout chose, validateurs
      await DomainService.domainSchema.validate(newRow);
      // Si c'est un ajout, l'id est une string et on utilise cette particularité pour déclencher un insert au lieu d'un update
      if (typeof newRow.id === "string") {
        // Post
        await DomainService.addDomain(newRow);
        // Refetch des données pour update le display
        domainsDataUpdate();
        winesDataUpdate();
        successToastTemplate(`${newRow.name} a bien été enregistré`);
        return newRow;
      }
      await DomainService.updateDomain(newRow);
      domainsDataUpdate();
      winesDataUpdate();
      successToastTemplate(`${newRow.name} a bien été mis à jour`);
      return newRow;
    } catch (err) {
      console.error("Update failed", err);
      return errorToastTemplate(`${err}`.split(" ").slice(1).join(" "));
    }
  });

  const onProcessRowUpdateError = (error) => {
    console.error(error);
  };

  return (
    <>
      <DeleteConfirmModal
        confirmDelete={confirmDelete}
        handleDeleteClick={handleDeleteClick}
        handleDeleteModal={handleDeleteModal}
        deletedElement={deletedDomain}
      />
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
            Domaines
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
            rows={!query ? domainsData : filteredDomainsData}
            columns={[
              {
                field: "name",
                headerClassName: "super-app-theme--header",
                headerName: "Domaine",
                width: 250,
                editable: true,
              },
              {
                field: "region_id",
                headerClassName: "super-app-theme--header",
                headerName: "Région",
                type: "singleSelect",
                valueOptions: regionSelect,
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
                      onClick={() => handleDeleteModal(id)}
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
            getRowClassName={() => `super-app-theme--row`}
            sx={{
              backgroundColor: "text.primary",
              color: "background.default",
              minWidth: "38%",
              maxWidth: "90%",
              "& .super-app-theme--header": {
                backgroundColor: "secondary.main",
              },
              "& .super-app-theme--row:nth-of-type(even)": {
                backgroundColor: "secondary.light",
              },
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

DomainModal.propTypes = {
  openModal: PropTypes.shape({
    isOpen: PropTypes.bool,
    data: PropTypes.string.isRequired,
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  domainsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      region_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  setDomainsData: PropTypes.func.isRequired,
  winesDataUpdate: PropTypes.func.isRequired,
  regionSelect: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
};
