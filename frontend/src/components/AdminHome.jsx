import { Typography, Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Logout } from "@mui/icons-material";
import { Bar, Doughnut, Pie, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { useAdminContext } from "../contexts/AdminContext";
import { useUserContext } from "../contexts/UserContext";
import TypeService from "../services/TypeService";
import UserService from "../services/UserService";
import FlavourService from "../services/FlavourService";
import WineService from "../services/WineService";
import GrapeService from "../services/GrapeService";

ChartJS.register(
  ArcElement,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminHome() {
  const {
    typesData,
    setTypesData,
    usersData,
    setUsersData,
    flavoursData,
    setFlavoursData,
    winesData,
    setWinesData,
    grapesData,
    setGrapesData,
  } = useAdminContext();

  const { logout } = useUserContext();

  useEffect(() => {
    async function fetch() {
      try {
        const wine = await WineService.getWines();
        setWinesData(wine.data);
        const grape = await GrapeService.getGrapes();
        setGrapesData(grape.data);
        const type = await TypeService.getTypes();
        setTypesData(type.data);
        const user = await UserService.getUsers();
        setUsersData(user.data);
        const flavour = await FlavourService.getFlavours();
        setFlavoursData(flavour.data);
      } catch (error) {
        console.error("Internal error");
      }
    }
    fetch();
  }, []);

  // --- Data pour afficher les types de vins par utilisateurs ---
  const usersPerTypeData = {
    labels: typesData.map((type) => type.name),
    datasets: [
      {
        label: `Utilisateurs dont c'est le type préféré `,
        data: typesData.map(
          (type) => usersData.filter((user) => user.type === type.name).length
        ),
        backgroundColor: ["#D8B024", "#C42727", "#b72a69"],
        borderWidth: 0,
      },
    ],
  };

  // --- Options pour usersPerTypeData ---
  const usersPerTypeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        labels: {
          color: "white",
          font: {
            size: 14,
            family: "Josefin Sans",
          },
        },
      },
      title: {
        display: true,
        text: "Type préféré par utilisateur",
        color: "white",
        position: "bottom",
        font: {
          size: 16,
          family: "Josefin Sans",
        },
      },
    },
  };

  // --- Data pour afficher les saveurs de vins par utilisateurs ---
  const usersPerFlavourData = {
    labels: flavoursData.map((flavour) => flavour.name),
    datasets: [
      {
        label: `Utilisateurs dont c'est la saveur préférée `,
        data: flavoursData.map(
          (flavour) =>
            usersData.filter((user) => user.flavour === flavour.name).length
        ),
        backgroundColor: [
          "#D8B024",
          "#7f4e05",
          "#052e7f",
          "#C42727",
          "#b72a69",
        ],
        borderWidth: 0,
      },
    ],
  };

  // --- Options pour usersPerFlavourData ---
  const usersPerFlavourOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "white",
          font: {
            size: 14,
            family: "Josefin Sans",
          },
        },
      },
      title: {
        display: true,
        text: "Saveur préférée par utilisateur",
        color: "white",
        padding: {
          bottom: 30,
        },
        font: {
          size: 16,
          family: "Josefin Sans",
        },
      },
    },
  };

  // --- Data pour afficher les vins par cépage ---
  const winesPerGrapeData = {
    labels: grapesData.map((grape) => grape.name),
    datasets: [
      {
        label: `Nombre de vins pour ce cépage `,
        data: grapesData.map(
          (grape) =>
            winesData.filter((wine) => wine.grape_variety_id === grape.id)
              .length
        ),
        backgroundColor: [
          "#D8B024",
          "#7f4e05",
          "#052e7f",
          "#C42727",
          "#b72a69",
        ],
        borderWidth: 0,
      },
    ],
  };

  // --- Options pour winesPerGrapeData ---
  const winesPerGrapeOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "white",
          font: {
            size: 14,
            family: "Josefin Sans",
          },
        },
      },
      title: {
        display: true,
        text: "Nombre de vins par cépage",
        color: "white",
        position: "bottom",
        padding: {
          bottom: 30,
        },
        font: {
          size: 16,
          family: "Josefin Sans",
        },
      },
    },
  };

  // --- Data pour afficher le nombre de vin par type ---
  const winesPerTypeData = {
    labels: typesData.map((type) => type.name),
    datasets: [
      {
        label: `Vins de ce type `,
        data: typesData.map(
          (type) => winesData.filter((wine) => wine.type_id === type.id).length
        ),
        backgroundColor: ["#D8B024", "#C42727", "#b72a69"],
        borderWidth: 0,
      },
    ],
  };

  // --- Options pour winesPerTypeData ---
  const winesPerTypeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "white",
          font: {
            size: 14,
            family: "Josefin Sans",
          },
        },
      },
      title: {
        display: true,
        text: "Nombre de vins par type",
        color: "white",
        font: {
          size: 16,
          family: "Josefin Sans",
        },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography variant="h4" sx={{ marginBlock: 5 }}>
        Bienvenue sur l'interface administrateur
      </Typography>
      <Typography variant="h5" sx={{ marginLeft: "-40%" }}>
        Voici quelques données sur vos utilisateurs...
      </Typography>
      <Stack
        sx={{
          width: "90vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box>
          <Doughnut data={usersPerTypeData} options={usersPerTypeOptions} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Bar data={usersPerFlavourData} options={usersPerFlavourOptions} />
        </Box>
      </Stack>
      <Typography variant="h5" sx={{ marginLeft: "-40%", marginBlock: 5 }}>
        ... ainsi que sur les vins que vous avez enregistré
      </Typography>
      <Stack
        sx={{
          width: "90vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PolarArea data={winesPerGrapeData} options={winesPerGrapeOptions} />
        </Box>
        <Box>
          <Pie data={winesPerTypeData} options={winesPerTypeOptions} />
        </Box>
      </Stack>
      <Button
        variant="contained"
        endIcon={<Logout />}
        sx={{ marginBlock: 5 }}
        onClick={logout}
      >
        Déconnexion
      </Button>
    </Box>
  );
}
