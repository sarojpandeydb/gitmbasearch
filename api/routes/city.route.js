const router = require("express").Router();
const Citycontroller = require("../controllers/city.controller");

router.get("/", Citycontroller.getCities);
router.get("/:id", Citycontroller.getCity);
router.post("/", Citycontroller.saveCity);

module.exports = router;
