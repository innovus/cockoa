var Models = require("../models/index");
var sequelize = Models.sequelize;
var queryFindTokenByEstudiante = "SELECT * FROM dispositivo WHERE id_estudiante = $id_estudiante";
var queries = {
    "dispositivo": {
        'findTokenByEstudiante': queryFindTokenByEstudiante,
    }
};
var findTokenByEstudiantes = function(ids_estudiante) {
    var cadena = "SELECT * FROM dispositivo WHERE id_estudiante IN (";
    var cadenaValores = "";
    ids_estudiante.forEach(function(id_estudiante, index) {
        cadenaValores += "'" + id_estudiante.id_estudiante + "'";
        if (index == ids_estudiante.length - 1) {
            console.log("ultimo registro");
        } else {
            console.log("registro");
            cadenaValores += ",";
        }
    });
    cadena = cadena + cadenaValores + ")"
    console.log(cadenaValores)
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.SELECT
    });
}
var findTokenByEstudiante = function(id_estudiante) {
        return sequelize.query(queries.dispositivo.findTokenByEstudiante, {
            bind: {
                id_estudiante: id_estudiante
            },
            type: sequelize.QueryTypes.SELECT
        });
    }
var deleteDispositivo = function(token_dispositivo) {
    var cadena = "DELETE FROM dispositivo " + "WHERE token_dispositivo = '" + token_dispositivo +"'";
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.DELETE
    });
};
var createDispositivo = function(token_dispositivo,id_estudiante) {
    var cadena = "INSERT INTO dispositivo (token_dispositivo,id_estudiante) " + "VALUES ('" + token_dispositivo + "','" + id_estudiante + "' ) ";
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.INSERT
    });
}
    /*
    var insertarNotificacion = function(logro){
      var cadena = "INSERT INTO logro (id_carga_docente,descripcion_logro,porcentaje_logro) "+
      "VALUES ("+logro.id_carga_docente+",'"+logro.descripcion_logro+"',"+logro.porcentaje_logro+") RETURNING id_logro";
      return sequelize.query(cadena,{
         type: sequelize.QueryTypes.INSERT
       });
    }
    */
module.exports.findTokenByEstudiante = findTokenByEstudiante;
module.exports.findTokenByEstudiantes = findTokenByEstudiantes;

module.exports.deleteDispositivo = deleteDispositivo;
module.exports.createDispositivo = createDispositivo;