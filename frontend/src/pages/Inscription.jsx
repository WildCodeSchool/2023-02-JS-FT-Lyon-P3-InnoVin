import InscriptionForm from "../components/InscriptionForm";
import styles from "./Inscription.module.css";
import logo from "../assets/logo.svg";

export default function Inscription() {
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="logo Inovin" />
        <h1 className={styles.inscriptionTitle}>Inscription</h1>
      </header>
      <div className={styles.inscriptionFormContainer}>
        <InscriptionForm />
      </div>
    </>
  );
}
