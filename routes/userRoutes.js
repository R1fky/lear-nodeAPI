const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/users", userController.getUser);
router.post("/add/user", userController.addUser);

module.exports = router;
