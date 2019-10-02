const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.get("/dashboard", UserController.dashboard);
router.get("/post-ads", UserController.postAds);
router.get("/profile", UserController.profile);

module.exports = router;