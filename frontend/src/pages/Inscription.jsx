import InscriptionForm from "@components/InscriptionForm";
import styles from "./Inscription.module.css";

export default function Inscription() {
  return (
    <>
      <h1 className={styles.inscriptionTitle}>Inscription</h1>
      <InscriptionForm />
    </>
  );
}
