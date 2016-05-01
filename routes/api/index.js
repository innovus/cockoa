var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/areas', db.getAllAreas);
router.get('/areas/:id', db.getSingleArea);
router.post('/areas', db.createArea);
router.put('/areas/:id', db.updateArea);
router.delete('/areas/:id', db.removeArea);


module.exports = router;