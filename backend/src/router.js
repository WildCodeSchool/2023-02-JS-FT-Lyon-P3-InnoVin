const express = require("express");

const router = express.Router();

const { validateLogin } = require("./validators");

const { verifyPassword } = require("./services/auth");

const { getUserByEmailMiddleWare } = require("./controllers/authControllers");

const {
  getSessionIdByDateMiddleWare,
} = require("./controllers/sessionControllers");

const {
  getWinesAndGrapesBySessionIdMiddleWare,
} = require("./controllers/wineControllers");

// Public routes
// Auth
router.post(
  "/login",
  validateLogin,
  getUserByEmailMiddleWare,
  verifyPassword,
  getSessionIdByDateMiddleWare,
  getWinesAndGrapesBySessionIdMiddleWare
);

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// Users
const userControllers = require("./controllers/userControllers");
const { validateUser } = require("./services/validators");
const { hashPassword } = require("./services/auth");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.get("/register", userControllers.browse);
router.get("/register/:id", userControllers.read);
router.post("/register", validateUser, hashPassword, userControllers.add);
router.put("/register/:id", userControllers.edit);
router.delete("/register/:id", userControllers.destroy);

// Sessions
const sessionControllers = require("./controllers/sessionControllers");

router.get("/sessions", sessionControllers.browse);
router.get("/sessions/:id", sessionControllers.read);
router.put("/sessions/:id", sessionControllers.edit);
router.post("/sessions", sessionControllers.add);
router.delete("/sessions/:id", sessionControllers.destroy);

// Session has Wines
const sessionHasWineControllers = require("./controllers/sessionHasWineControllers");

router.get("/sessionhaswines", sessionHasWineControllers.browse);
router.get("/sessionhaswines/:id", sessionHasWineControllers.read);
router.put("/sessionhaswines/:id", sessionHasWineControllers.edit);
router.post("/sessionhaswines", sessionHasWineControllers.add);
router.delete("/sessionhaswines/:id", sessionHasWineControllers.destroy);

// Wines
const wineControllers = require("./controllers/wineControllers");

router.get("/wines", wineControllers.browse);
router.get("/wines/:id", wineControllers.read);
router.put("/wines/:id", wineControllers.edit);
router.post("/wines", wineControllers.add);
router.delete("/wines/:id", wineControllers.destroy);

const tastingnoteControllers = require("./controllers/tastingnoteControllers");

router.get("/tastingnotes", tastingnoteControllers.browse);
router.get("/tastingnotes/:id", tastingnoteControllers.read);
router.put("/tastingnotes/:id", tastingnoteControllers.edit);
router.post("/tastingnotes", tastingnoteControllers.add);
router.delete("/tastingnotes/:id", tastingnoteControllers.destroy);

// Grapes
const grapeControllers = require("./controllers/grapeControllers");

router.get("/grapes", grapeControllers.browse);
router.get("/grapes/:id", grapeControllers.read);
router.put("/grapes/:id", grapeControllers.edit);
router.post("/grapes", grapeControllers.add);
router.delete("/grapes/:id", grapeControllers.destroy);

// Domains
const domainControllers = require("./controllers/domainControllers");

router.get("/domains", domainControllers.browse);
router.get("/domains/:id", domainControllers.read);
router.put("/domains/:id", domainControllers.edit);
router.post("/domains", domainControllers.add);
router.delete("/domains/:id", domainControllers.destroy);

// Regions
const regionControllers = require("./controllers/regionControllers");

router.get("/regions", regionControllers.browse);
router.get("/regions/:id", regionControllers.read);
router.put("/regions/:id", regionControllers.edit);
router.post("/regions", regionControllers.add);
router.delete("/regions/:id", regionControllers.destroy);

// Countries
const countryControllers = require("./controllers/countryControllers");

router.get("/countries", countryControllers.browse);
router.get("/countries/:id", countryControllers.read);
router.put("/countries/:id", countryControllers.edit);
router.post("/countries", countryControllers.add);
router.delete("/countries/:id", countryControllers.destroy);

// Types
const typeControllers = require("./controllers/typeControllers");

router.get("/types", typeControllers.browse);
router.get("/types/:id", typeControllers.read);
router.put("/types/:id", typeControllers.edit);
router.post("/types", typeControllers.add);
router.delete("/types/:id", typeControllers.destroy);

// Aromas
const aromaControllers = require("./controllers/aromaControllers");

router.get("/aromas", aromaControllers.browse);
router.get("/aromas/:id", aromaControllers.read);
router.put("/aromas/:id", aromaControllers.edit);
router.post("/aromas", aromaControllers.add);
router.delete("/aromas/:id", aromaControllers.destroy);

// Aromas
const flavourControllers = require("./controllers/flavourControllers");

router.get("/flavours", flavourControllers.browse);
router.get("/flavours/:id", flavourControllers.read);
router.put("/flavours/:id", flavourControllers.edit);
router.post("/flavours", flavourControllers.add);
router.delete("/flavours/:id", flavourControllers.destroy);

module.exports = router;
