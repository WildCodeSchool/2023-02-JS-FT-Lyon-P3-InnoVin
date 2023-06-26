const express = require("express");

const router = express.Router();

const { verifyPassword } = require("./services/auth");

const { getUserByEmailMiddleWare } = require("./controllers/authControllers");

// Public routes
// Auth
router.post("/login", getUserByEmailMiddleWare, verifyPassword);

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const userControllers = require("./controllers/userControllers");
const { validateUser } = require("./services/validators");
const { hashPassword } = require("./services/auth");

router.get("/register", userControllers.browse);
router.get("/register/:id", userControllers.read);
router.post("/register", hashPassword, validateUser, userControllers.add);
router.put("/register/:id", userControllers.edit);
router.delete("/register/:id", userControllers.destroy);

module.exports = router;
