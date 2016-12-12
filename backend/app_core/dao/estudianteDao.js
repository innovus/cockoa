var Models = require("../models/index");
var sequelize = Models.sequelize;
var queryFindEstudianteByIdUsuario = "SELECT id_estudiante FROM estudiante NATURAL JOIN persona "+
    " WHERE id_usuario = $id_usuario ";

var queryFindAllEstudianteByIdCurso = "SELECT nombre1,nombre2, apellido1, apellido2, estudiante.id_estudiante "+
 "FROM curso JOIN matricula ON curso.id_curso = matricula.id_curso " +
  "JOIN estudiante ON estudiante.id_estudiante = matricula.id_estudiante " +
   "JOIN persona ON estudiante.identificacion = persona.identificacion" +
    " WHERE curso.id_curso = $id_curso ORDER BY apellido1,apellido2, nombre1";

var queries = {
    "estudiante": {
        'findAllEstudianteByIdCurso': queryFindAllEstudianteByIdCurso,
        'findEstudianteByIdUsuario': queryFindEstudianteByIdUsuario,
    }
};

var findAllEstudianteByIdCurso = function(id_curso) {
        return sequelize.query(queries.estudiante.findAllEstudianteByIdCurso, {
            bind: {
                id_curso: id_curso
            },
            type: sequelize.QueryTypes.SELECT
        });
    }
var findEstudianteByIdUsuario = function(id_usuario) {
        return sequelize.query(queries.estudiante.findEstudianteByIdUsuario, {
            bind: {
                id_usuario: id_usuario
            },
            type: sequelize.QueryTypes.SELECT
        });
    }

module.exports.findAllEstudianteByIdCurso = findAllEstudianteByIdCurso;
module.exports.findEstudianteByIdUsuario = findEstudianteByIdUsuario;
