const express = require("express");

const router = express.Router();

const { validateLogin } = require("./validators");

const { verifyPassword } = require("./services/auth");

const { getUserByEmailMiddleWare } = require("./controllers/authControllers");

// Public routes
// Auth
router.post("/login", validateLogin, getUserByEmailMiddleWare, verifyPassword);

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);

module.exports = router;
