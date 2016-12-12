var Models = require("../models/index");
var sequelize = Models.sequelize;
var queryFindEstudianteByIdUsuario = "SELECT * FROM estudiante NATURAL JOIN persona "+
    " WHERE id_usuario = $id_usuario ";

var queries = {
    "estudiante": {
        'findEstudianteByIdUsuario': queryFindEstudianteByIdUsuario,
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

module.exports.findEstudianteByIdUsuario = findEstudianteByIdUsuario;
