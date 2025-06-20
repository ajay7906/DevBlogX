const express = require("express");
const { register, login, logout, adminLogin } = require("../controllers/authControllers");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/adminLogin",  adminLogin);

module.exports = router;