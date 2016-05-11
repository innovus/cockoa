var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo1';
var db = pgp(connectionString);

// add query functions
function getAllAreas(req, res, next) {
  db.any('select * from area')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL areas'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleArea(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from area where id_area = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE area'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
//

function createArea(req, res, next) {
  req.body.id_area = parseInt(req.body.id_area);
  
  db.none('insert into area(id_area,nombre_area) values(${id_area}, ${nombre_area})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Area'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateArea(req, res, next) {
  db.none('update area set nombre_area=$1 where id_area=$2',
    [req.body.nombre_area, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Area'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeArea(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from area where id_area = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Area'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllAreas: getAllAreas ,
  getSingleArea: getSingleArea,
  createArea: createArea,
  updateArea: updateArea,
  removeArea: removeArea
};