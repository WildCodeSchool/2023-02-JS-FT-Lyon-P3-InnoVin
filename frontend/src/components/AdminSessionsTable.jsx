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
        /* if (sessionsWithWines) */ setSessionsWithWinesData(
          sessionsWithWines
        );
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
  }, []);

  const sessionsWithWinesDataUpdate = async () => {
    const session = await SessionService.getSessions();
    setSessionsData(session.data.reverse());
    const winesOfSessions = await SessionHasWineService.getWinesOfSessions();
    setSessionsHaveWinesData(winesOfSessions.data);
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
    setSessionsWithWinesData(sessionsWithWines);
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
      // Mets les states sessionsData et sessionHaveWinesData à jour après la suppression et génère à nouveau le tableau SessionWithWines afin qu'il soit actualisé
      sessionsWithWinesDataUpdate();
      successToastTemplate(
        `La session du ${deletedSession[0].date} à ${deletedSession[0].time} a été supprimée.`
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
      setSessionsWithWinesData(
        sessionsWithWinesData.filter((session) => session.id !== id)
      );
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
    const arrayOfWines = [
      newRow.wine1,
      newRow.wine2,
      newRow.wine3,
      newRow.wine4,
    ];

    const checkNoDuplicateWine =
      arrayOfWines.filter((wine, index) => arrayOfWines.indexOf(wine) !== index)
        .length === 0;

    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    if (currentDay < 10) {
      currentDay = `0${currentDay}`;
    }

    if (currentMonth < 10) {
      currentMonth = `0${currentMonth}`;
    }

    const currentDate = `${currentYear}/${currentMonth}/${currentDay}`;

    let selectedDay = newRow.date.getDate();
    let selectedMonth = newRow.date.getMonth() + 1;
    const selectedYear = newRow.date.getFullYear();

    if (selectedDay < 10) {
      selectedDay = `0${selectedDay}`;
    }

    if (selectedMonth < 10) {
      selectedMonth = `0${selectedMonth}`;
    }

    const selectedDate = `${selectedDay}/${selectedMonth}/${selectedYear}`;

    const newRowWithFormattedDate = { ...newRow, date: selectedDate };

    const reversedSelectedDate = `${newRowWithFormattedDate.date.substring(
      6,
      10
    )}/${newRowWithFormattedDate.date.substring(
      3,
      5
    )}/${newRowWithFormattedDate.date.substring(0, 2)}`;
    const arrayOfDates = [currentDate, reversedSelectedDate];

    const checkNoPriorDate = arrayOfDates.sort()[0] === currentDate;

    const checkNoDuplicateSession = sessionsData.find(
      (session) =>
        session.date === newRowWithFormattedDate.date &&
        session.time === newRowWithFormattedDate.time
    );
    try {
      await SessionService.sessionSchema.validate(newRowWithFormattedDate);
      if (!checkNoDuplicateWine) {
        return errorToastTemplate(
          "Une même session ne peut comprendre deux ou plusieurs vins identiques."
        );
      }
      if (!checkNoPriorDate) {
        return errorToastTemplate(
          "Une session ne peut être programmée pour une date antérieure à la date d'aujourd'hui."
        );
      }
      if (checkNoDuplicateSession !== undefined) {
        return errorToastTemplate(
          "Il ne peut y avoir deux sessions à la même date et à la même heure."
        );
      }
      {
        if (typeof newRowWithFormattedDate.id === "string") {
          // Si c'est un ajout, l'id est une string et on utilise cette particularité pour déclencher un insert au lieu d'un update
          await SessionService.addSession(newRowWithFormattedDate);
          /* sessionsDataUpdate(); */ sessionsWithWinesDataUpdate();
          const updatedSessions = await SessionService.getSessions();
          const lastSessionId =
            updatedSessions.data[updatedSessions.data.length - 1].id;
          const newRowWithId = {
            ...newRowWithFormattedDate,
            id: lastSessionId,
          };
          await SessionHasWineService.addSessionWines(newRowWithId);
          /* sessionsHaveWinesDataUpdate(); */ sessionsWithWinesDataUpdate();
          successToastTemplate(
            `La session du ${newRowWithFormattedDate.date} à ${newRow.time} a bien été enregistrée.`
          );
          return newRow;
        }
        const { id } = newRowWithFormattedDate;
        await SessionService.updateSession(newRowWithFormattedDate);
        /* sessionsDataUpdate(); */ sessionsWithWinesDataUpdate();
        await SessionHasWineService.deleteCurrentSessionWines(id);
        /*  sessionsHaveWinesDataUpdate(); */ sessionsWithWinesDataUpdate();
        await SessionHasWineService.addSessionWines(newRowWithFormattedDate);
        /*   sessionsHaveWinesDataUpdate(); */ sessionsWithWinesDataUpdate();
        successToastTemplate(
          `La séance du ${newRowWithFormattedDate.date} à ${newRow.time} a bien été mise à jour.`
        );
        return newRowWithFormattedDate;
      }
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

  const timeSelect = ["10:00", "14:00", "16:00"];

  const columnsSessions = [
    {
      field: "date",
      headerClassName: "super-app-theme--header",
      headerName: "Date",
      type: "date",
      width: 150,
      editable: true,
      valueGetter: (params) => {
        const [day, month, year] = params.value.split("/");

        return new Date(+year, +month - 1, +day);
      },
    },
    {
      field: "time",
      headerClassName: "super-app-theme--header",
      headerName: "Horaires",
      type: "singleSelect",
      valueOptions: timeSelect,
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
