const router = require('express').Router();

const ct = require("../controllers/homeController");

function homeRoute(req, res){
    ct.getData(req, res);
};

function getImage(req, res){
    ct.getImage(req, res);
};

router.get('/', homeRoute);
router.get('/image', getImage);

module.exports = router;