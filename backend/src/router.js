const express = require("express");

const router = express.Router();

const { validateLogin } = require("./validators");

const { verifyPassword } = require("./services/auth");

const { getUserByEmailMiddleWare } = require("./controllers/authControllers");

const {
  getSessionIdByDateMiddleWare,
} = require("./controllers/sessionControllers");

const {
  getWineIdBySessionIdMiddleWare,
} = require("./controllers/sessionHasWineControllers");

// Public routes
// Auth
router.post(
  "/login",
  validateLogin,
  getUserByEmailMiddleWare,
  getSessionIdByDateMiddleWare,
  getWineIdBySessionIdMiddleWare,
  verifyPassword
);

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

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

const sessionControllers = require("./controllers/sessionControllers");

router.get("/sessions", sessionControllers.browse);
router.get("/sessions/:id", sessionControllers.read);
router.put("/sessions/:id", sessionControllers.edit);
router.post("/sessions", sessionControllers.add);
router.delete("/sessions/:id", sessionControllers.destroy);

module.exports = router;
