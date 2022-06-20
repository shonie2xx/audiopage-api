const controller = require("../controllers/audbook_controller");
const authJwt = require("../middleware/authJwt");
const router = require('express').Router();

router
  .get("/", controller.getAll)
  .get("/mybooks", authJwt.verifyToken, controller.getMyPublished)
  .get("/:id", authJwt.verifyToken, controller.getOne)
  .post("/mybooks", authJwt.verifyToken, controller.createOne)
  .delete("/:id", controller.deleteOne)
  .put("/:id", authJwt.verifyToken, controller.updateOne)
  .post("/buy/:id", authJwt.verifyToken, controller.buyOne);
  
module.exports = router;