var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/liceo';
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

//

module.exports = {
  getAllAreas: getAllAreas/* ,
 getSingleArea: getSingleArea,
  createArea: createArea,
  updateArea: updateArea,
  removeArea: removeArea*/
};