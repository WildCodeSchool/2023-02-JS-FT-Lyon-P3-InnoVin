import { useFormik } from "formik";
import * as Yup from "yup";
import Radiogroup from "@components/Radiogroup";
import { MenuItem, TextField } from "@mui/material";
import styles from "./InscriptionForm.module.css";

export default function InscriptionForm() {
  Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalname email address").required("Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    confirmPassword: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    birthday: Yup.date().required("Required"),
    street: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    postcode: Yup.number()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    city: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    flavor: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    aroma: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: "",
      street: "",
      postcode: "",
      city: "",
      buttons: "",
      flavor: "",
      aroma: "",
    },

    onSubmit: (values) => {
      alert(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.nameContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="firstName">Prénom</label>
            <TextField
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="lastName">Nom</label>
            <input
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Mot de passe</label>
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="confrimPassword">Confirmation mot de passe</label>
          <input
            name="confirmPassword"
            type="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
        </div>
        <div className={styles.birthdayContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="birthday">Date de naissance</label>
            <input
              name="birthday"
              type="date"
              onChange={formik.handleChange}
              value={formik.date}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="street">Numéro et rue</label>
          <input
            name="street"
            type="street"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
        </div>
        <div className={styles.streetContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="postcode">Code Postal</label>
            <input
              name="postcode"
              type="postcode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postcode}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="city">Ville</label>
            <input
              name="city"
              type="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
          </div>
        </div>

        <div className={styles.preferContainer}>
          <h2>Vos préférences</h2>
          <div className={styles.buttonContainer} />
        </div>
        <Radiogroup
          value={formik.values.buttons}
          onChange={formik.handleChange}
        />

        <div className={styles.inputContainer}>
          <label htmlFor="flavor">Saveur</label>
          <TextField
            name="flavor"
            onChange={formik.handleChange}
            value={formik.values.flavor}
            select
          >
            <MenuItem value="">Sélectionner un arôme </MenuItem>
            <MenuItem value="choix1">choix1 </MenuItem>
          </TextField>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="arôme">Arôme</label>
          <input
            name="aroma"
            type="aroma"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.aroma}
          />
        </div>

        <button className={styles.submitButton} type="submit">
          Valider{" "}
        </button>
      </form>
    </div>
  );
}
