import { useFormik } from "formik";
import { differenceInYears, parse } from "date-fns";
import { toast } from "react-toastify";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import validationSchema from "@services/validator";
import rouge from "../assets/redwinepicture.png";
import rose from "../assets/rosewinepicture.png";
import blanc from "../assets/whitewinepicture.png";
import APIService from "../services/APIService";
import styles from "./InscriptionForm.module.css";

export default function InscriptionForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      birthdate: "",
      password: "",
      confirmPassword: "",
      address: "",
      postcode: "",
      city: "",
      flavourId: "",
      aromaId: "",
      typeId: "",
    },
    validationSchema,

    validate(values) {
      const errors = {};

      if (values.birthdate) {
        const currentDate = new Date();
        const selectedDate = parse(values.birthdate, "yyyy-MM-dd", new Date());

        const age = differenceInYears(currentDate, selectedDate);

        if (age < 18) {
          errors.birthdate = "Vous devez avoir au moins 18 ans";
        }
      }
      return errors;
    },

    onSubmit: () => {
      APIService.post(`/register`, formik.values)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            toast.error("Problème lors de l'inscription", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    },
  });

  const handleClick = () => {
    if (!formik.isValid) {
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
  const style = {
    button: { p: 2, width: 0.9, borderRadius: 2 },
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.informationsContainer}>
          <div className={styles.nameContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="firstName">Prénom</label>
                {formik.touched.firstname && formik.errors.firstname && (
                  <div className={styles.error}>{formik.errors.firstname}</div>
                )}
              </div>
              <input
                name="firstname"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstname}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="lastname">Nom</label>
                {formik.touched.lastname && formik.errors.lastname && (
                  <div className={styles.error}>{formik.errors.lastname}</div>
                )}
              </div>

              <input
                name="lastname"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastname}
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
              <label htmlFor="hashedPassword">Mot de passe</label>
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
                  {formik.errors.birthdate && (
                    <div className={styles.error}>
                      {formik.errors.birthdate}
                    </div>
                  )}{" "}
                </div>
                <input
                  name="birthdate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.birthdate}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="address">Numéro et rue</label>
                {formik.touched.address && formik.errors.address && (
                  <div className={styles.error}>{formik.errors.address}</div>
                )}{" "}
              </div>
              <input
                name="address"
                type="address"
                onChange={formik.handleChange}
                value={formik.values.address}
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
              {formik.touched.typeId && formik.errors.typeId && (
                <div className={styles.error}>{formik.errors.typeId}</div>
              )}
              <div className={styles.buttonswineContainer}>
                <div
                  className={`${styles.redwine} ${
                    formik.values.typeId === "1"
                      ? styles.checked
                      : styles.disabled
                  }`}
                  style={{ backgroundImage: `url(${rouge})` }}
                >
                  <label>
                    <input
                      type="radio"
                      name="typeId"
                      value={1}
                      checked={formik.values.typeId === "1"}
                      onChange={formik.handleChange}
                    />
                    Rouge
                  </label>
                </div>
                <div
                  className={`${styles.rosewine} ${
                    formik.values.typeId === "2"
                      ? styles.checked
                      : styles.disabled
                  }`}
                  style={{ backgroundImage: `url(${rose})` }}
                >
                  <label>
                    <input
                      type="radio"
                      name="typeId"
                      value={2}
                      checked={formik.values.typeId === "2"}
                      onChange={formik.handleChange}
                    />
                    Rosé
                  </label>
                </div>
                <div
                  className={`${styles.whitewine} ${
                    formik.values.typeId === "3"
                      ? styles.checked
                      : styles.disabled
                  }`}
                  style={{ backgroundImage: `url(${blanc})` }}
                >
                  <label>
                    <input
                      type="radio"
                      name="typeId"
                      value={3}
                      checked={formik.values.typeId === "3"}
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
                {formik.touched.flavourId && formik.errors.flavourId && (
                  <div className={styles.error}>{formik.errors.flavourId}</div>
                )}{" "}
              </div>
              <select
                name="flavourId"
                onChange={formik.handleChange}
                value={formik.values.flavourId}
                type="select"
              >
                <option value="">Sélectionner une saveur </option>
                <option value={1}>choix1 </option>
                <option value={2}>choix2 </option>
                <option value={3}>choix3 </option>
                <option value={4}>choix4 </option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.labelErroContainer}>
                <label htmlFor="arôme">Arôme</label>
                {formik.touched.aromaId && formik.errors.aromaId && (
                  <div className={styles.error}>{formik.errors.aromaId}</div>
                )}
              </div>
              <select
                name="aromaId"
                onChange={formik.handleChange}
                value={formik.values.aromaId}
                type="select"
              >
                <option value="">Sélectionner un arôme </option>
                <option value={1}>choix1 </option>
                <option value={2}>choix2 </option>
                <option value={3}>choix3 </option>
                <option value={4}>choix4 </option>
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
