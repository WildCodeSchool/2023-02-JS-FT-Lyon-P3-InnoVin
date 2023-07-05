const models = require("../models");

const browse = (req, res) => {
  models.sessionHasWine
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// const read = (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   models.sessionHasWine
//     .find(id)
//     .then(([rows]) => {
//       if (rows[0] == null) {
//         res.sendStatus(404);
//       } else {
//         res.send(rows[0]);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const edit = (req, res) => {
//   const session = req.body;

//   // TODO validations (length, format...)

//   session.id = parseInt(req.params.id, 10);

//   models.session
//     .update(session)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const add = (req, res) => {
  const sessionHasWine = req.body;

  // TODO validations (length, format...)

  models.sessionHasWine
    .insert(sessionHasWine)
    .then(([result]) => {
      res.location(`/sessions/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// const destroy = (req, res) => {
//   const id = parseInt(req.params.id, 10);

//   models.session
//     .delete(id)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const getWineIdBySessionIdMiddleWare = (req, res, next) => {
  // We just wanna check if session exist with this date
  const { session } = req.user;
  models.sessionHasWine
    .findWineIdBySessionId(session.id)
    .then((wines) => {
      if (wines[0]) {
        // if session exist, push it to req.user so we can access like req.user.id, req.user.firstname, etc
        [req.user.wines] = wines;
        next();
      } else {
        // If session with this date doesnt exist
        res.status(401).send("Aucun vin n'est associé à cette session");
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  //   read,
  //   edit,
  add,
  //   destroy,
  getWineIdBySessionIdMiddleWare,
};
