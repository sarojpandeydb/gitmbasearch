const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { validate } = require("../middlewares/validator");

router.post("/signup", validate("signup"), UserController.register);
router.post("/login", validate("login"), UserController.login);

module.exports = router;
