const controller = require("../controllers/auth_controller.js");
const router = require('express').Router();

router
  .get("/", controller.getHealthy)
module.exports = router;