var Models = require("../models/index");
var sequelize = Models.sequelize;
var queryFindEstudianteByIdUsuario = "SELECT * FROM estudiante NATURAL JOIN persona "+
    " WHERE id_usuario = $id_usuario ";
var queryFindPersonaByIdUsuario = "SELECT * FROM persona  "+
    " WHERE id_usuario = $id_usuario ";

var queries = {
    "persona": {
        'findPersonaByIdUsuario': queryFindPersonaByIdUsuario,
    }
};

var findEstudianteByIdUsuario = function(id_usuario) {
        return sequelize.query(queries.estudiante.findEstudianteByIdUsuario, {
            bind: {
                id_usuario: id_usuario
            },
            type: sequelize.QueryTypes.SELECT
        });
    };

var findPersonaByIdUsuario = function(id_usuario) {
        return sequelize.query(queries.persona.findPersonaByIdUsuario, {
            bind: {
                id_usuario: id_usuario
            },
            type: sequelize.QueryTypes.SELECT
        });
    };

module.exports.findEstudianteByIdUsuario = findEstudianteByIdUsuario;
module.exports.findPersonaByIdUsuario = findPersonaByIdUsuario;
