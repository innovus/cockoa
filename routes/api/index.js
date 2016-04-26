var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/areas', db.getAllAreas);
router.get('/api/areas/:id', db.getSingleArea);
router.post('/api/areas', db.createArea);
router.put('/api/areas/:id', db.updateArea);
router.delete('/api/areas/:id', db.removeArea);


module.exports = router;