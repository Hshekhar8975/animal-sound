const router = require('express').Router();

const fc = require('../controllers/feedController');

function getFeed(req, res){
    fc.getFeed()
        .then(data => {
            res.status(200).json({
                code:200,
                msg: "success",
                result: data
            })
        })
        .catch(err => {
            res.status(500).json({
                code:500,
                msg: err
            })
        })
}

router.get('/', getFeed);

module.exports = router;