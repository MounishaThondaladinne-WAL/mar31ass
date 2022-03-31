var express = require("express");
var router = express.Router();
const usersController = require("../controllers/userregistration");
router.post("/", usersController.createUser);
router.get("/", usersController.getUsers);
router.post("/login", usersController.loginUser);
router.get("/checkusername/:username", usersController.checkusername);
router.get("/checkemail/:email", usersController.checkemail);
module.exports = router;
