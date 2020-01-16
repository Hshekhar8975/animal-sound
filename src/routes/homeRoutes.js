const router = require('express').Router();

const ct = require("../controllers/homeController");

function homeRoute(req, res){
    ct.getData(req, res);
    // res.status(200).json({
    //     code: 200,
    //     msg: "ok"
    // });
}

router.get('/', homeRoute);

module.exports = router;