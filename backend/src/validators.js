const yup = require("yup");

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

module.exports = {
  validateLogin,
};
