const controller= require('../controllers/users');
const router = require('express').Router();
const { authJwt } = require("../middleware");
//crud
router
    .get('/',[authJwt.verifyToken], controller.getAll)
    .get('/:id',[authJwt.verifyToken], controller.getOne)
    .post('/', controller.createOne)
    .put('/:id', controller.updateOne)
    .delete('/:id', controller.deleteOne);

module.exports = router;