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
module.exports = { validateUser };
