const controller= require('../controllers/library_controller');
const router = require('express').Router();
const authJwt = require("../middleware/authJwt");

//crud
router
    .get('/', authJwt.verifyToken ,controller.getUpdate);

module.exports = router;