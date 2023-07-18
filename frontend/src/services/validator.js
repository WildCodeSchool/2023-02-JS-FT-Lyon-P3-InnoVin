import * as Yup from "yup";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("*"),
  lastname: Yup.string().max(20, "Must be 20 characters or less").required("*"),
  email: Yup.string().email("Invalid email").required("*"),
  password: Yup.string("Entrez votre mot de passe")
    .min(8, "Le mot de passe doit être de 8 caractères minimum")
    .max(30, "Le mot de passe ne doit pas dépasser 30 caractères")
    .required("*"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Le mot de passe doit être identique")
    .required("*"),
  birthdate: Yup.date().required("*"),
  address: Yup.string().max(60, "Must be 60 characters or less").required("*"),
  postcode: Yup.number().integer().required("*"),
  city: Yup.string().max(40, "Must be 40 characters or less").required("*"),
  flavourId: Yup.number().required("*"),
  aromaId: Yup.number().required("*"),
  typeId: Yup.number().required("*"),
});

export default validationSchema;
