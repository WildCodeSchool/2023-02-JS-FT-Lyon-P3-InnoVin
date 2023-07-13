const models = require("../models");

const browse = (req, res) => {
  models.grape
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
  models.grape
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
  const grape = req.body;

  // TODO validations (length, format...)

  grape.id = parseInt(req.params.id, 10);

  models.grape
    .update(grape)
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
  const grape = req.body;

  // TODO validations (length, format...)

  models.grape
    .insert(grape)
    .then(([result]) => {
      res.location(`/grapes/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.grape
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
const getGrapesBySessionIdMiddleWare = (req, res) => {
  models.grape
    .findGrapesBySessionId(req.body.sessionTime)
    .then((grapes) => {
      if (grapes[0]) {
        [req.session.grapes] = grapes;
        res.send([req.user, req.session]);
      } else {
        res.sendStatus(401);
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
  getGrapesBySessionIdMiddleWare,
};
