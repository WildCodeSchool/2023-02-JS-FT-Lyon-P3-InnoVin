const yup = require("yup");

const validateUser = (req, res, next) => {
  const {
    aromaId,
    flavourId,
    typeId,
    firstname,
    lastname,
    birthdate,
    email,
    password,
    address,
    postcode,
    city,
  } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (aromaId == null) {
    errors.push({ field: "aromaId", message: "This field is required" });
  }
  if (flavourId == null) {
    errors.push({ field: "flavourId", message: "This field is required" });
  }
  if (typeId == null) {
    errors.push({ field: "typeId", message: "This field is required" });
  }
  if (firstname == null) {
    errors.push({ field: "firstname", message: "This field is required" });
  }
  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  }
  if (birthdate == null) {
    errors.push({ field: "birthdate", message: "This field is required" });
  }
  if (password == null) {
    errors.push({
      field: "password",
      message: "This field is required",
    });
  }
  if (address == null) {
    errors.push({ field: "address", message: "This field is required" });
  }
  if (postcode == null) {
    errors.push({ field: "postcode", message: "This field is required" });
  }
  if (city == null) {
    errors.push({ field: "city", message: "This field is required" });
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const validateLogin = (req, res, next) => {
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

  validationSchema
    .validate(req.body)
    .then(() => next())
    .catch((error) => res.status(422).json({ [error.path]: error.message }));
  // validate req.body then call next() if everything is ok
};

const wineSchema = yup.object({
  name: yup
    .string()
    .typeError("Le nom du vin ne doit contenir que des lettres")
    .max(45, "Le nom du vin est trop long")
    .required("Veuillez entrer le nom d'un vin"),
  country_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un pays dans la liste")
    .required("Veuillez sélectionner un pays"),
  region_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner une région dans la liste")
    .required("Veuillez sélectionner une région"),
  domain_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un domaine dans la liste")
    .required("Veuillez sélectionner un domaine"),
  grape_variety_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un cépage dans la liste")
    .required("Veuillez sélectionner un cépage"),
  vintage: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez entrer une année valide")
    .min(1000, "Vous avez vraiment une bouteille aussi vieille ?")
    .max(9999, "Ce millésime n'existe pas (encore)")
    .required("Veuillez entrer une année"),
  aroma_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un arôme dans la liste")
    .required("Veuillez sélectionner un arôme"),
  flavour_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner une saveur dans la liste")
    .required("Veuillez sélectionner une saveur"),
  type_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un type dans la liste")
    .required("Veuillez sélectionner un type"),
});

const validateWine = (req, res, next) => {
  wineSchema
    .validate(req.body)
    .then(() => next())
    .catch((error) => res.status(422).json({ [error.path]: error.message }));
};

module.exports = { validateUser, validateLogin, validateWine };
