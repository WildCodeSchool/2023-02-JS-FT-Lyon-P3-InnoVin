const models = require("../models");

const browse = (req, res) => {
  models.session
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.session
    .find(id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const session = req.body;

  // TODO validations (length, format...)

  session.id = parseInt(req.params.id, 10);

  models.session
    .update(session)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const session = req.body;

  // TODO validations (length, format...)

  models.session
    .insert(session)
    .then(([result]) => {
      res.location(`/sessions/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.session
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getSessionIdByDateMiddleWare = (req, res, next) => {
  // We just wanna check if session exist with this date
  const { sessionDate } = req.body;
  models.session
    .findSessionIdByDate(sessionDate)
    .then(([sessions]) => {
      if (sessions[0]) {
        // if session exist, push it to req.session so we can access like req.user.id, req.user.firstname, etc
        [req.session] = sessions;
        next();
      } else {
        // If session with this date doesnt exist
        res.status(465).send("Aucune session n'est prévue pour cette date");
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getSessionIdByDateMiddleWare,
};
