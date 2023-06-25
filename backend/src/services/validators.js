const validateUser = (req, res, next) => {
  const {
    aroma,
    flavourId,
    typeId,
    firstname,
    lastname,
    birthdate,
    email,
    hashedPassword,
    address,
    city,
  } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (aroma == null) {
    errors.push({ field: "aroma", message: "This field is required" });
  }
  if (flavourId == null) {
    errors.push({ field: "flavour_id", message: "This field is required" });
  }
  if (typeId == null) {
    errors.push({ field: "type_id", message: "This field is required" });
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
  if (hashedPassword == null) {
    errors.push({
      field: "hashed_password",
      message: "This field is required",
    });
  }
  if (address == null) {
    errors.push({ field: "adress", message: "This field is required" });
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
