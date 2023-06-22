import { useFormik } from "formik";
import * as Yup from "yup";
import { differenceInYears, parse } from "date-fns";

import styles from "./InscriptionForm.module.css";

export default function InscriptionForm() {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Obligatoire"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Obligatoire"),
    email: Yup.string()
      .email("Invalname email address")
      .required("Obligatoire"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Obligatoire"),
    confirmPassword: Yup.string()
      .max(20, "Must be 20 characters or less")
      .oneOf([Yup.ref("password"), null], "Le mot de passe doit être identique")
      .required("Obligatoire"),
    birthday: Yup.date().required("Obligatoire"),
    street: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Obligatoire"),
    postcode: Yup.number().integer().required("Obligatoire"),
    city: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Obligatoire"),
    flavor: Yup.string(),
    aroma: Yup.string(),
    wine: Yup.string().required("Obligatoire"),
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

    onSubmit: (values) => {
      alert(values);
    },
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.informationsContainer}>
          <div className={styles.nameContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="firstName">Prénom</label>
              <input
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className={styles.error}>{formik.errors.firstName}</div>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="lastName">Nom</label>
              <input
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.touched.firstName && formik.errors.lastName && (
                <div className={styles.error}>{formik.errors.lastName}</div>
              )}
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
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Mot de passe</label>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confrimPassword">Confirmation mot de passe</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className={styles.error}>
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          <div className={styles.birthdayContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="birthday">Date de naissance</label>
              <input
                name="birthday"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.birthday}
              />
              {formik.errors.birthday && (
                <div className={styles.error}>{formik.errors.birthday}</div>
              )}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="street">Numéro et rue</label>
            <input
              name="street"
              type="street"
              onChange={formik.handleChange}
              value={formik.values.date}
            />
            {formik.touched.street && formik.errors.street && (
              <div className={styles.error}>{formik.errors.street}</div>
            )}
          </div>
          <div className={styles.streetContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="postcode">Code Postal</label>
              <input
                name="postcode"
                type="postcode"
                onChange={formik.handleChange}
                value={formik.values.postcode}
              />
              {formik.touched.postcode && formik.errors.postcode && (
                <div className={styles.error}>{formik.errors.postcode}</div>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="city">Ville</label>
              <input
                name="city"
                type="city"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city && (
                <div className={styles.error}>{formik.errors.city}</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.bottomFormContainer}>
          <div className={styles.preferContainer}>
            <h2>Vos préférences</h2>
            <div className={styles.buttonswineContainer}>
              <div
                className={`${styles.redwine} ${
                  formik.values.wine === "rouge" ? styles.checked : ""
                }`}
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
                  formik.values.wine === "rosé" ? styles.checked : ""
                }`}
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
                  formik.values.wine === "blanc" ? styles.checked : ""
                }`}
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
            {formik.touched.wine && formik.errors.wine && (
              <div className={styles.error}>{formik.errors.wine}</div>
            )}
            <div className={styles.inputContainer}>
              <label htmlFor="flavor">Saveur</label>
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
              <label htmlFor="arôme">Arôme</label>
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

          <button className={styles.submitButton} type="submit">
            Valider{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
