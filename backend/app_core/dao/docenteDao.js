var Models = require("../models/index");
var sequelize = Models.sequelize;
var queriFindCursosMateriasByPeriodo = "SELECT id_carga_docente, id_docente, id_materia, nombre_materia, id_curso, grado, grupo " + "FROM carga_docente NATURAL JOIN materia NATURAL JOIN curso " + "WHERE vigente_carga_docente = '1' AND id_docente = '1' AND id_periodo = $id_periodo " + "ORDER BY grado, grupo ";
var queriFindMateriasByCurso = "SELECT id_carga_docente, id_docente, id_materia, nombre_materia, id_curso, grado, grupo " + "FROM carga_docente NATURAL JOIN materia NATURAL JOIN curso " + "WHERE vigente_carga_docente = '1' AND id_docente = '1' " + "AND id_periodo = " + "(SELECT DISTINCT id_periodo FROM carga_docente natural join periodo " + "WHERE fecha_inicio_periodo <= '" + fecha_actual + "' AND fecha_fin_periodo >= '" + fecha_actual + "' ) " + "ORDER BY grado, grupo ";


var queryFindDocenteByIdUsuario = "SELECT id_docente FROM docente NATURAL JOIN persona "+
    " WHERE id_usuario = $id_usuario ";

var queries = {
    "docente": {
        'findCursosMateriasByPeriodo': findCursosMateriasByPeriodo,
        'findDocenteByIdUsuario': queryFindDocenteByIdUsuario
    }
};
var getCursosMateriasByPeriodo = function(id_periodo) {
    return sequelize.query(queries.docente.findCursosMateriasByPeriodo, {
        bind: {
            id_periodo: id_periodo
        },
        type: sequelize.QueryTypes.SELECT
    });
}

var findDocenteByIdUsuario = function(id_usuario) {
        return sequelize.query(queries.docente.findDocenteByIdUsuario, {
            bind: {
                id_usuario: id_usuario
            },
            type: sequelize.QueryTypes.SELECT
        });
    }
module.exports.getCursosMateriasByPeriodo = getCursosMateriasByPeriodo;
module.exports.findDocenteByIdUsuario = findDocenteByIdUsuario