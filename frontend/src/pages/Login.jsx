import { React, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  FormLabel,
  InputLabel,
  InputBase,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSessionContext } from "../contexts/SessionContext";
import { useUserContext } from "../contexts/UserContext";
import SessionService from "../services/SessionService";
import APIService from "../services/APIService";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg";
import styles from "./Login.module.css";
import { useAdminContext } from "../contexts/AdminContext";

export default function Login() {
  const [sessions, setSessions] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const { errorToastTemplate } = useAdminContext();

  useEffect(() => {
    if (searchParams.has("expired")) {
      errorToastTemplate("Session expirée, veuillez vous reconnecter.");
      setSearchParams(() => {
        return undefined;
      });
    }
  }, []);

  const style = {
    formlabels: {
      textAlign: "left",
      color: "secondary.main",
      fontSize: "1em",
      width: "75vw",
      fontFamily: "EB Garamond",
    },
    textfields: {
      backgroundColor: "#FFFDCC",
      height: "5vh",
      borderRadius: "5px",
      marginBottom: "2rem",
      fontSize: "1.5rem",
      color: "black",
      paddingLeft: "0.5rem",
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
  });

  const { login } = useUserContext();
  const { setSessionId, setSessionWines, setSessionGrapes } =
    useSessionContext();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      sessionId: "",
    },
    validationSchema,

    onSubmit: (values) => {
      APIService.post(`/login`, values)
        .then(({ data: [user, session] }) => {
          login(user);
          setSessionId(session.sessionId);
          localStorage.setItem("sessionId", JSON.stringify(session.sessionId));
          setSessionWines(session.wines);
          setSessionGrapes(session.grapes);
          if (user.role === "Utilisateur") {
            toast.success(
              `Bienvenue ${user.firstname}! Vous allez être redirigé vers la page d'accueil.`,
              {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                icon: "🍷",
              }
            );
            setTimeout(() => {
              navigate("/workshop");
            }, 3000);
          } else if (user.role === "Admin") {
            toast.success(
              `Bienvenue ${user.firstname}! Vous allez être redirigé vers votre dashboard.`,
              {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                icon: "🍷",
              }
            );
            setTimeout(() => {
              navigate("/admin/home");
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            toast.error("Email et/ou mot de passe incorrect(s)", {
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
  useEffect(() => {
    SessionService.getSessions().then((result) => {
      setSessions(result.data);
      if (result.data.length) formik.values.sessionId = result.data[0].id;
    });
  }, []);
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
            variant="h3"
            sx={{
              mt: "4rem",
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
            marginTop="2rem"
          >
            <InputLabel id="sessionId" name="sessionId" sx={style.formlabels} />
            <Select
              label="sessionId"
              name="sessionId"
              sx={{
                backgroundColor: "#FFFDCC",
                fontSize: "1.5rem",
                height: "5vh",
                marginBottom: "5rem",
                color: "black",
                width: "100%",
                fontFamily: "Gill sans",
              }}
              value={formik.values.sessionId}
              onChange={formik.handleChange}
            >
              {sessions?.map((session) => (
                <MenuItem key={session.id} value={session.id}>
                  {session.date}, {session.time}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <div className={styles.validateButton}>
            <Button
              color="error"
              variant="contained"
              sx={{ mb: "3rem", width: "30vw", height: "5vh" }}
              type="submit"
              onClick={handleClick}
            >
              <Typography variant="button" fontSize={24}>
                Valider
              </Typography>
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
}
