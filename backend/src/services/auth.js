const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_TIMING } = process.env;

const hashingOptions = {
  type: argon2.argon2id,

  memoryCost: 2 ** 16,

  timeCost: 5,

  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);

      res.sendStatus(500);
    });
};

const verifyPassword = async (req, res, next) => {
  argon2

    .verify(
      "$argon2id$v=19$m=16,t=2,p=1$cXFnN2s1ZHU0aTAwMDAwMA$XFP3Vrp4/huxiy9p4p2EAw",
      req.body.password
    )

    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, JWT_SECRET, {
          expiresIn: JWT_TIMING,
        });
        delete req.body.password;
        delete req.user.hashedPassword;

        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });

        next();
      } else {
        res.sendStatus(401);
      }
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return res.sendStatus(403);

    // on place le contenu du token (payloads dans la propriété payloads de la requête)
    // afin de pouvoir retrouver les infos de l'utilisateurs connecté dans la prochaine fonction.
    req.payloads = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(403);
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
};
