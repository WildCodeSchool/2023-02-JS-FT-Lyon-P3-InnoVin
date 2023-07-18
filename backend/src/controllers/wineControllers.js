const models = require("../models");

const browse = (req, res) => {
  models.wine
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
  models.wine
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
  const wine = req.body;

  // TODO validations (length, format...)

  wine.id = parseInt(req.params.id, 10);

  models.wine
    .update(wine)
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
  const wine = req.body;

  // TODO validations (length, format...)

  models.wine
    .insert(wine)
    .then(([result]) => {
      res.location(`/wines/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.wine
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

const getWinesBySessionIdMiddleWare = (req, res, next) => {
  req.session = {};
  req.session.sessionId = req.body.sessionId;
  models.wine
    .findWinesBySessionId(req.body.sessionId)
    .then((wines) => {
      if (wines[0]) {
        [req.session.wines] = wines;
        next();
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
  getWinesBySessionIdMiddleWare,
};
