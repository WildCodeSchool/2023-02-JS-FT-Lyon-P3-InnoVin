import { useEffect, useState, useCallback } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useAdminContext } from "../contexts/AdminContext";
import SessionService from "../services/SessionService";
import SessionHasWineService from "../services/SessionHasWineService";
import WineService from "../services/WineService";
import SearchBar from "./SearchBar";

export default function AdminSessionsTable() {
  const {
    query,
    sessionsData,
    setSessionsData,
    winesData,
    setWinesData,
    setSessionsHaveWinesData,
    successToastTemplate,
    errorToastTemplate,
  } = useAdminContext();
  const [rowModesModel, setRowModesModel] = useState({});
  const [sessionsWithWinesData, setSessionsWithWinesData] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const session = await SessionService.getSessions();
        setSessionsData(session.data.reverse());
        const winesOfSessions =
          await SessionHasWineService.getWinesOfSessions();
        setSessionsHaveWinesData(winesOfSessions.data);
        const wine = await WineService.getWines();
        setWinesData(wine.data.reverse());
        const sessionsWithWines = [];
        for (let i = 0; i < session.data.length; i += 1) {
          sessionsWithWines.push({ ...session.data[i] });
          const winesForEachSession = winesOfSessions.data.filter(
            (element) => element.session_id === session.data[i].id
          );
          for (let j = 1; j < 5; j += 1) {
            const key = `wine${j}`;
            sessionsWithWines[i][key] = winesForEachSession[j - 1].wine_id;
          }
        }
        if (sessionsWithWines) setSessionsWithWinesData(sessionsWithWines);
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
  }, []);

  const sessionsDataUpdate = async () => {
    try {
      const session = await SessionService.getSessions();
      setSessionsData(session.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const sessionsHaveWinesDataUpdate = async () => {
    try {
      const winesOfSessions = await SessionHasWineService.getWinesOfSessions();
      setSessionsHaveWinesData(winesOfSessions.data);
    } catch (error) {
      console.error(error);
    }
  };

  // --- Gestion de la suppression ---
  const handleDeleteClick = (id) => async () => {
    try {
      // Va chercher la session supprimée pour le toast
      const deletedSession = sessionsData.filter(
        (session) => session.id === id
      );
      // Supprime la session de la BDD
      await SessionService.deleteSession(id);
      // Met le state sessionsData à jour après la suppression
      sessionsDataUpdate();
      sessionsHaveWinesDataUpdate();
      successToastTemplate(
        `La session du ${deletedSession[0].date} à ${deletedSession[0].time} a été supprimée`
      );
    } catch (err) {
      console.error("Deletion failed :", err);
    }
  };

  // --- Gestion de l'ajout ---
  const handleAddClick = () => {
    // Check si une nouvelle n'est pas déjà présente
    if (!sessionsData.some((session) => typeof session.id === "string")) {
      // Génère un id temporaire en string le temps d'insérer les nouvelles données
      const id = `new${sessionsData[sessionsData.length - 1].id + 1}`;
      // Crée un nouvel objet dans le state sessionsData pour stocker les nouvelles données
      setSessionsWithWinesData((sessions) => [
        {
          id,
          date: "",
          time: "",
          wine1: "",
          wine2: "",
          wine3: "",
          wine4: "",
          isNew: true,
        },
        ...sessions,
      ]);

      // Passe la nouvelle ligne en mode édition
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "date" },
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
      setSessionsData(sessionsData.filter((session) => session.id !== id));
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
      await SessionService.sessionSchema.validate(newRow);
      if (typeof newRow.id === "string") {
        // Si c'est un ajout, l'id est une string et on utilise cette particularité pour déclencher un insert au lieu d'un update
        await SessionService.addSession(newRow);
        sessionsDataUpdate();
        const updatedSessions = await SessionService.getSessions();
        const lastSessionId =
          updatedSessions.data[updatedSessions.data.length - 1].id;
        const newRowWithId = { ...newRow, id: lastSessionId };
        await SessionHasWineService.addSessionWines(newRowWithId);
        sessionsHaveWinesDataUpdate();
        successToastTemplate(
          `La session du ${newRow.date} à ${newRow.time} a bien été enregistrée`
        );
        return newRow;
      }
      const { id } = newRow;
      await SessionService.updateSession(newRow);
      sessionsDataUpdate();
      await SessionHasWineService.deleteCurrentSessionWines(id);
      sessionsHaveWinesDataUpdate();
      await SessionHasWineService.addSessionWines(newRow);
      sessionsHaveWinesDataUpdate();
      successToastTemplate(
        `La séance du ${newRow.date} à ${newRow.time} a bien été mise à jour`
      );
      return newRow;
    } catch (err) {
      console.error("Update failed", err);
      return errorToastTemplate(`${err}`.split(" ").slice(1).join(" "));
    }
  });

  const onProcessRowUpdateError = (error) => {
    console.error(error);
  };

  // --- Déclaration des valeurs des selects ---
  const wineSelect = winesData.map((wine) => ({
    value: wine.id,
    label: wine.name,
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
    {
      field: "wine1",
      headerClassName: "super-app-theme--header",
      headerName: "Vin 1",
      type: "singleSelect",
      valueOptions: wineSelect,
      width: 250,
      editable: true,
    },
    {
      field: "wine2",
      headerClassName: "super-app-theme--header",
      headerName: "Vin 2",
      type: "singleSelect",
      valueOptions: wineSelect,
      width: 250,
      editable: true,
    },
    {
      field: "wine3",
      headerClassName: "super-app-theme--header",
      headerName: "Vin 3",
      type: "singleSelect",
      valueOptions: wineSelect,
      width: 250,
      editable: true,
    },
    {
      field: "wine4",
      headerClassName: "super-app-theme--header",
      headerName: "Vin 4",
      type: "singleSelect",
      valueOptions: wineSelect,
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
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  // --- Filtre pour la recherche ---
  const sessionsWithWinesDataFiltered = sessionsWithWinesData.filter(
    (session) => session.date.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
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
          onClick={handleAddClick}
        >
          Ajouter
        </Button>
      </Box>
      <DataGrid
        rows={!query ? sessionsWithWinesData : sessionsWithWinesDataFiltered}
        columns={columnsSessions}
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
