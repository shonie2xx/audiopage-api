const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth_controller.js");
const router = require('express').Router();

router
  .post("/signup",[verifySignUp.checkDuplicateUsername,verifySignUp.checkRolesExisted], controller.signup)
  .post("/signin",controller.signin)
  .post("/signout", controller.signout);
module.exports = router;