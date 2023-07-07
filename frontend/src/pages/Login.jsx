import { React } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  FormLabel,
  InputLabel,
  MenuItem,
  InputBase,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSessionContext } from "../contexts/SessionContext";
import { useUserContext } from "../contexts/UserContext";
import APIService from "../services/APIService";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg";
import styles from "./Login.module.css";

export default function Login() {
  const style = {
    formlabels: {
      textAlign: "left",
      color: "secondary.main",
      fontSize: "1em",
      width: "75vw",
    },
    textfields: {
      backgroundColor: "#FFFDCC",
      height: "5vh",
      borderRadius: "5px",
      marginBottom: "2vh",
      fontSize: "1.5rem",
      color: "black",
      paddingLeft: "0.5em",
    },
  };

  const validationSchema = yup.object({
    email: yup
      .string("Entrez votre adresse mail")
      .email("Entrez une adresse mail valide")
      .required("Une adresse mail est requise"),
    password: yup
      .string("Entrez votre mot de passe")
      .min(8, "Le mot de passe doit être de 8 caractères minimum")
      .max(30, "Le mot de passe ne doit pas dépasser 30 caractères")
      .required("Le mot de passe est requis"),
    sessionName: yup.string().required("Un nom de session est requis"),
    sessionDate: yup.date().required("Une date de session est requise"),
  });

  const { login } = useUserContext();
  const { setSessionWines, setSessionGrapes } = useSessionContext();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      sessionName: "",
      sessionDate: "",
    },
    validationSchema,

    onSubmit: (values) => {
      APIService.post(`/login`, values)
        .then(({ data: [user, session] }) => {
          login(user);
          setSessionWines(session.wines);
          setSessionGrapes(session.grapes);
          toast.success(
            `Bienvenue ${user.firstname}! Vous allez être redirigé vers la page d'accueil.`,
            { position: toast.POSITION.TOP_CENTER, autoClose: 2000, icon: "🍷" }
          );
          setTimeout(() => {
            navigate("/tasting");
          }, 3000);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            toast.error("Email et/ou mot de passe incorrect(s)", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else if (error.response?.status === 465) {
            toast.error("Aucune session n'est prévue pour cette date", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Veuillez réessayer plus tard", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    },
  });

  const handleClick = () => {
    if (formik.errors.email) {
      toast.error(`${formik.errors.email}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (formik.errors.password) {
      toast.error(`${formik.errors.password}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (formik.errors.sessionName) {
      toast.error(`${formik.errors.sessionName}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (formik.errors.sessionDate) {
      toast.error(`${formik.errors.sessionDate}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <Box flexDirection="row" display="flex" marginBottom="5rem">
        <img src={logo} alt="logo" />
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "56vw",
            color: "secondary.main",
            fontSize: "calc(2.5rem + 1vmin)",
          }}
        >
          {" "}
          Connexion{" "}
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} className={styles.formcontainer}>
        <Box
          maxHeight="650px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="75w"
          maxWidth="900px"
        >
          <Box
            width="100%"
            alignSelf="center"
            display="flex"
            flexDirection="column"
          >
            <FormLabel htmlFor="email_id" sx={style.formlabels}>
              {" "}
              Email{" "}
            </FormLabel>
            <InputBase
              sx={style.textfields}
              id="email_id"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormLabel sx={style.formlabels} htmlFor="password_id">
              {" "}
              Mot de Passe{" "}
            </FormLabel>
            <InputBase
              id="password_id"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              sx={style.textfields}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{ textDecoration: "underline", mt: "0.5em" }}
            color="#C42727"
          >
            J'ai oublié mon mot de passe
          </Typography>
          <Typography
            variant="h3"
            sx={{
              p: 3,
              mt: 2,
              color: "secondary.main",
              fontSize: "calc(2.5rem + 1vmin)",
            }}
          >
            {" "}
            Session{" "}
          </Typography>
          <Box
            width="100%"
            alignSelf="center"
            display="flex"
            flexDirection="column"
          >
            <InputLabel id="sessionName_id" sx={style.formlabels}>
              {" "}
              Nom{" "}
            </InputLabel>
            <Select
              labelId="sessionName_id"
              name="sessionName"
              value={formik.values.sessionName}
              onChange={formik.handleChange}
              select
              sx={{
                backgroundColor: "#FFFDCC",
                fontSize: "1.5rem",
                height: "5vh",
                marginBottom: "1.5vh",
                color: "black",
              }}
            >
              <MenuItem value=""> Sélectionnez le nom </MenuItem>
              <MenuItem value="choix 1"> choix 1 </MenuItem>
              <MenuItem value="choix 2"> choix 2 </MenuItem>
              <MenuItem value="choix 3"> choix 3 </MenuItem>
            </Select>
            <FormLabel htmlFor="sessionDate_id" sx={style.formlabels}>
              {" "}
              Date{" "}
            </FormLabel>
            <InputBase
              id="sessionDate_id"
              type="date"
              name="sessionDate"
              value={formik.values.sessionDate}
              onChange={formik.handleChange}
              sx={style.textfields}
            />
          </Box>
          <Button
            color="error"
            variant="contained"
            sx={{ mt: 12, width: "30vw", height: "5vh" }}
            type="submit"
            onClick={handleClick}
          >
            <Typography variant="button" fontSize={24}>
              Valider
            </Typography>
          </Button>
        </Box>
      </form>
    </div>
  );
}
