const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const WineControllers = require("./controllers/WineControllers")

router.get("/wines", WineControllers.browse);
router.get("/wines/:id", WineControllers.read);
router.put("/wines/:id", WineControllers.edit);
router.post("/wines", WineControllers.add);
router.delete("/wines/:id", WineControllers.destroy);

const UserControllers = require("./controllers/UserControllers")

router.get("/users", UserControllers.browse);
router.get("/users/:id", UserControllers.read);
router.put("/users/:id", UserControllers.edit);
router.post("/users", UserControllers.add);
router.delete("/users/:id", UserControllers.destroy);

const SessionControllers = require("./controllers/SessionControllers")

router.get("/sessions", SessionControllers.browse);
router.get("/sessions/:id", SessionControllers.read);
router.put("/sessions/:id", SessionControllers.edit);
router.post("/sessions", SessionControllers.add);
router.delete("/sessions/:id", SessionControllers.destroy);

const GrapeVarietyControllers = require("./controllers/GrapeVarietyControllers")

router.get("/sessions", GrapeVarietyControllers.browse);
router.get("/sessions/:id", GrapeVarietyControllers.read);
router.put("/sessions/:id", GrapeVarietyControllers.edit);
router.post("/sessions", GrapeVarietyControllers.add);
router.delete("/sessions/:id", GrapeVarietyControllers.destroy);

module.exports = router;
