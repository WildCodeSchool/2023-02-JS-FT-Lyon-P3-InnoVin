import React from "react";
import {
  Typography,
  Stack,
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
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg";
import styles from "./Login.module.css";

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      sessionName: "",
      sessionDate: "",
    },
    validationSchema,
    onSubmit: () => {},
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
      <Stack direction="row" spacing={20} height="10vh" marginBottom={8}>
        <img src={logo} alt="logo" />
        <Typography variant="h3" sx={{ p: 3, color: "secondary.main" }}>
          {" "}
          Connexion{" "}
        </Typography>
      </Stack>
      <form onSubmit={formik.handleSubmit} className={styles.formcontainer}>
        <Box
          width="75vw"
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
        <Typography variant="h3" sx={{ p: 3, mt: 6, color: "secondary.main" }}>
          {" "}
          Session{" "}
        </Typography>
        <Box
          width="75vw"
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
        {/* <ToastContainer limit={4} /> */}
      </form>
    </div>
  );
}
