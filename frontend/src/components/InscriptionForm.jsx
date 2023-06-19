import { useFormik } from "formik";
import styles from "./InscriptionForm.module.css";

export default function InscriptionForm() {
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
      saveur: "",
      arôme: "",
    },
    onSubmit:values =>
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.nameContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="firstName">Prénom</label>
            <input
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="lastName">Nom</label>
            <input
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="confrimPassword">Confirmation mot de passe</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
        </div>
        <div className={styles.birthdayContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="birthday">Date de naissance</label>
            <input
              id="birthday"
              name="birthday"
              onChange={formik.handleChange}
              value={formik.values.birthday}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="street">Numéro et rue</label>
          <input
            id="street"
            name="street"
            onChange={formik.handleChange}
            value={formik.values.street}
          />
        </div>
        <div className={styles.streetContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="postcode">Code Postal</label>
            <input
              id="postcode"
              name="postcode"
              onChange={formik.handleChange}
              value={formik.values.postcode}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="city">Ville</label>
            <input
              id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
          </div>
        </div>

        <div className={styles.preferContainer}>
          <h2>Vos préférences</h2>
          <div className={styles.buttonContainer}>
            <button className={styles.rouge} type="submit">
              Rouge
            </button>
            <button className={styles.rose} type="submit">
              {" "}
              Rosé
            </button>
            <button className={styles.white} type="submit">
              {" "}
              Blanc
            </button>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="saveur">Saveur</label>
          <input
            id="saveur"
            name="saveur"
            onChange={formik.handleChange}
            value={formik.values.saveur}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="arôme">Arôme</label>
          <input
            id="arôme"
            name="arôme"
            onChange={formik.handleChange}
            value={formik.values.arôme}
          />
        </div>
        <button className={styles.submitButton} type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}
