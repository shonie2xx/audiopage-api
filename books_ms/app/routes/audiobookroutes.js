const controller = require("../controllers/audbook_controller");
const authJwt = require("../middleware/authJwt");
const router = require('express').Router();

router
  .get("/", controller.getAll)
  .get("/:id", authJwt.verifyToken, controller.getOne)
  .get("/mybooks/all", authJwt.verifyToken, controller.getMyPublished)
  .post("/mybooks/post", authJwt.verifyToken, controller.createOne)
  .delete("/:id", controller.deleteOne)
  .put("/:id", authJwt.verifyToken, controller.updateOne)
  .post("/buy/:id", authJwt.verifyToken, controller.buyOne);
  
module.exports = router;