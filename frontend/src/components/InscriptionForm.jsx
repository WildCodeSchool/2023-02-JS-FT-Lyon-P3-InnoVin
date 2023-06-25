import { useFormik } from "formik";
import * as Yup from "yup";
import { differenceInYears, parse } from "date-fns";
import { toast } from "react-toastify";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rouge from "../assets/redwinepicture.png";
import rose from "../assets/rosewinepicture.png";
import blanc from "../assets/whitewinepicture.png";

import styles from "./InscriptionForm.module.css";

export default function InscriptionForm() {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("*"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("*"),
    email: Yup.string().email("Invalname email address").required("*"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("*"),
    confirmPassword: Yup.string()
      .max(20, "Must be 20 characters or less")
      .oneOf([Yup.ref("password"), null], "Le mot de passe doit être identique")
      .required("*"),
    birthday: Yup.date().required("*"),
    street: Yup.string().max(60, "Must be 60 characters or less").required("*"),
    postcode: Yup.number().integer().required("*"),
    city: Yup.string().max(40, "Must be 40 characters or less").required("*"),
    flavor: Yup.string().required("*"),
    aroma: Yup.string().required("*"),
    wine: Yup.string().required("*"),
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
      flavor: "",
      aroma: "",
      wine: "",
    },
    validationSchema,
    validate: (values) => {
      const errors = {};

      if (values.birthday) {
        const currentDate = new Date();
        const selectedDate = parse(values.birthday, "yyyy-MM-dd", new Date());

        const age = differenceInYears(currentDate, selectedDate);

        if (age < 18) {
          errors.birthday = "Vous devez avoir au moins 18 ans";
        }
      }

      return errors;
    },

    onSubmit: () => {
      if (validationSchema) {
        axios
          .post(`${BACKEND_URL}/register`, formik.values)
          .then(() => {})
          .then(() => {
            navigate("/login");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  });

  const style = {
    button: { p: 2, width: 0.9, borderRadius: 2 },
  };
  const handleClick = () => {
    if (formik.errors) {
      toast.error("Champ manquant", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.informationsContainer}>
          <div className={styles.nameContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="firstName">Prénom</label>
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className={styles.error}>{formik.errors.firstName}</div>
                )}
              </div>
              <input
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="lastName">Nom</label>
                {formik.touched.firstName && formik.errors.lastName && (
                  <div className={styles.error}>{formik.errors.lastName}</div>
                )}
              </div>

              <input
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.labelErroContainer}>
              <label htmlFor="email">Email</label>
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}{" "}
            </div>
            <input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.labelErroContainer}>
              <label htmlFor="password">Mot de passe</label>
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}{" "}
            </div>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="confrimPassword">
                  Confirmation mot de passe
                </label>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className={styles.error}>
                      {formik.errors.confirmPassword}
                    </div>
                  )}{" "}
              </div>
              <input
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
            </div>

            <div className={styles.birthdayContainer}>
              <div className={styles.inputContainer}>
                <div className={styles.labelErroContainer}>
                  <label htmlFor="birthday">Date de naissance</label>
                  {formik.errors.birthday && (
                    <div className={styles.error}>{formik.errors.birthday}</div>
                  )}{" "}
                </div>
                <input
                  name="birthday"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.birthday}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="street">Numéro et rue</label>
                {formik.touched.street && formik.errors.street && (
                  <div className={styles.error}>{formik.errors.street}</div>
                )}{" "}
              </div>
              <input
                name="street"
                type="street"
                onChange={formik.handleChange}
                value={formik.values.date}
              />
            </div>
            <div className={styles.streetContainer}>
              <div className={styles.inputContainer}>
                <div className={styles.labelErroContainer}>
                  <label htmlFor="postcode">Code Postal</label>
                  {formik.touched.postcode && formik.errors.postcode && (
                    <div className={styles.error}>{formik.errors.postcode}</div>
                  )}{" "}
                </div>
                <input
                  name="postcode"
                  type="postcode"
                  onChange={formik.handleChange}
                  value={formik.values.postcode}
                />
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.labelErroContainer}>
                  <label htmlFor="city">Ville</label>
                  {formik.touched.city && formik.errors.city && (
                    <div className={styles.error}>{formik.errors.city}</div>
                  )}{" "}
                </div>
                <input
                  name="city"
                  type="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomFormContainer}>
          <div className={styles.preferContainer}>
            <h2>Vos préférences</h2>
            <div className={styles.winelabelError}>
              {formik.touched.wine && formik.errors.wine && (
                <div className={styles.error}>{formik.errors.wine}</div>
              )}
              <div className={styles.buttonswineContainer}>
                <div
                  className={`${styles.redwine} ${
                    formik.values.wine === "rouge"
                      ? styles.checked
                      : styles.disabled
                  }`}
                  style={{ backgroundImage: `url(${rouge})` }}
                >
                  <label>
                    <input
                      type="radio"
                      name="wine"
                      value="rouge"
                      checked={formik.values.wine === "rouge"}
                      onChange={formik.handleChange}
                    />
                    Rouge
                  </label>
                </div>
                <div
                  className={`${styles.rosewine} ${
                    formik.values.wine === "rosé"
                      ? styles.checked
                      : styles.disabled
                  }`}
                  style={{ backgroundImage: `url(${rose})` }}
                >
                  <label>
                    <input
                      type="radio"
                      name="wine"
                      value="rosé"
                      checked={formik.values.wine === "rosé"}
                      onChange={formik.handleChange}
                    />
                    Rosé
                  </label>
                </div>
                <div
                  className={`${styles.whitewine} ${
                    formik.values.wine === "blanc"
                      ? styles.checked
                      : styles.disabled
                  }`}
                  style={{ backgroundImage: `url(${blanc})` }}
                >
                  <label>
                    <input
                      type="radio"
                      name="wine"
                      value="blanc"
                      checked={formik.values.wine === "blanc"}
                      onChange={formik.handleChange}
                    />
                    Blanc
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="flavor">Saveur</label>
                {formik.touched.flavor && formik.errors.flavor && (
                  <div className={styles.error}>{formik.errors.flavor}</div>
                )}{" "}
              </div>
              <select
                name="flavor"
                onChange={formik.handleChange}
                value={formik.values.flavor}
                type="select"
              >
                <option value="">Sélectionner une saveur </option>
                <option value="choix1">choix1 </option>
                <option value="choix2">choix2 </option>
                <option value="choix3">choix3 </option>
                <option value="choix4">choix4 </option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="arôme">Arôme</label>
                {formik.touched.aroma && formik.errors.aroma && (
                  <div className={styles.error}>{formik.errors.aroma}</div>
                )}
              </div>
              <select
                name="aroma"
                onChange={formik.handleChange}
                value={formik.values.aroma}
                type="select"
              >
                <option value="">Sélectionner un arôme </option>
                <option value="choix1">choix1 </option>
                <option value="choix2">choix2 </option>
                <option value="choix3">choix3 </option>
                <option value="choix4">choix4 </option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.submitButton}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={style.button}
            onClick={handleClick}
          >
            <Typography variant="button" fontSize={24}>
              Valider{" "}
            </Typography>
          </Button>
        </div>
      </form>
    </div>
  );
}
