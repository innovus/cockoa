var Models=require("../models/index");
var sequelize = Models.sequelize;


/*
var queryFindInasistenciasByCarga = "SELECT nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo "+
    "FROM inasistencia "+
    "JOIN carga_docente ON inasistencia.id_carga = carga_docente.id_carga_docente "+ 
    "JOIN usuario ON usuario.id_usuario =  carga_docente.id_usuario "+
    "JOIN materia ON materia.id_materia = carga_docente.id_materia "+
    "JOIN periodo ON periodo.id_periodo = carga_docente.id_periodo "+
    "JOIN docente ON docente.id_docente = carga_docente.id_docente "+
    "JOIN persona ON persona.identificacion = docente.identificacion  "+ 
    "WHERE id_carga = $id_carga";*/

var queryFindInasistenciasEstudianteByCarga ="SELECT * FROM inasistencia NATURAL "+
    "JOIN carga_docente NATURAL JOIN docente JOIN persona ON docente.identificacion = persona.identificacion "+
    "NATURAL JOIN materia NATURAL JOIN periodo WHERE id_carga_docente=$id_carga AND id_estudiante=$id_estudiante";


var queryFindCantidadInasistenciasBYMateria = "select id_materia,nombre_materia,count(*) as total_inasistencia from inasistencia join carga_docente "+
     "on inasistencia.id_carga=carga_docente.id_carga_docente natural join materia where inasistencia.id_estudiante = $id_estudiante "+
     "GROUP BY nombre_materia,id_materia ORDER BY nombre_materia ASC";

var queryFindCantidadInasistenciasByCarga = "SELECT estudiante.id_estudiante, COUNT(estudiante.id_estudiante) AS cantidad "+
    "FROM inasistencia "+
    "RIGHT JOIN estudiante ON inasistencia.id_estudiante = estudiante.id_estudiante "+
    "JOIN carga_docente ON inasistencia.id_carga = carga_docente.id_carga_docente "+
    "WHERE carga_docente.id_carga_docente = $id_carga "+
    "GROUP BY estudiante.id_estudiante";

var queryFindInasistenciasByEstudiante = "SELECT nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo "+
     "FROM inasistencia "+
     "JOIN carga_docente ON inasistencia.id_carga = carga_docente.id_carga_docente "+ 
    // "JOIN usuario ON usuario.id_usuario =  carga_docente.id_usuario "+
     "JOIN materia ON materia.id_materia = carga_docente.id_materia "+
     "JOIN periodo ON periodo.id_periodo = carga_docente.id_periodo "+
     "JOIN docente ON docente.id_docente = carga_docente.id_docente "+
     "JOIN persona ON persona.identificacion = docente.identificacion "+
     "WHERE usuario.id_usuario = $id_usuario";

var queryFindInasistenciasByCarga = "SELECT id_inasistencia, fecha_inasistencia, estado_inasistencia "+
    "FROM inasistencia "+
    "WHERE id_carga = $id_carga AND id_estudiante = $id_estudiante ORDER BY fecha_inasistencia DESC"

var queryFindInasistenciasByMateria = "SELECT carga_docente.id_materia,nombre_materia, nombre1, nombre2, apellido1, apellido2, estado_inasistencia, fecha_inasistencia, numero_periodo "+
    "FROM inasistencia JOIN carga_docente ON inasistencia.id_carga = carga_docente.id_carga_docente "+
    "JOIN materia ON materia.id_materia = carga_docente.id_materia "+
    "JOIN periodo ON periodo.id_periodo = carga_docente.id_periodo "+
    "JOIN docente ON docente.id_docente = carga_docente.id_docente "+
    "JOIN persona ON persona.identificacion = docente.identificacion "+
    "WHERE materia.id_materia= $id_materia AND inasistencia.id_estudiante= $id_estudiante "+
    /*  "(SELECT estudiante.id_estudiante FROM usuario NATURAL JOIN persona "+
        "NATURAL JOIN estudiante WHERE usuario.id_usuario = $id_usuario ) "+*/
    "ORDER by fecha_inasistencia"

var addInasistencias= function(inasistencias){
   var cadena="INSERT INTO inasistencia(id_estudiante,estado_inasistencia,fecha_inasistencia,id_carga) VALUES ";
   var cadenaValores="";
   inasistencias.forEach(function(inasistencia,index){
        cadenaValores += "('"+inasistencia.id_estudiante+"',"+inasistencia.estado_inasistencia+",'"+inasistencia.fecha_inasistencia+"',"+inasistencia.id_carga+")";
       if(index==inasistencias.length-1){
           console.log("ultimo registro");
       }
       else{
           console.log("registro");
           cadenaValores+= ",";
       }
   });
   cadena = cadena + cadenaValores
   console.log(cadenaValores)
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.INSERT
   });

};
var queries={
    "inasistencia":{
        'findInasistenciasByCarga':queryFindInasistenciasByCarga,
        'findCantidadInasistenciasByCarga': queryFindCantidadInasistenciasByCarga,
        'findInasistenciasByEstudiante':queryFindInasistenciasByEstudiante,
        'findInasistenciasByMateria':queryFindInasistenciasByMateria,
        'findCantidadInasistenciasBYMateria':queryFindCantidadInasistenciasBYMateria,
        'findInasistenciasEstudianteByCarga':queryFindInasistenciasEstudianteByCarga,
    }
};

var findInasistenciasEstudianteByCarga = function(id_carga,id_estudiante){
    return sequelize.query(queries.inasistencia.findInasistenciasEstudianteByCarga,{bind:{id_carga:id_carga,id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT})
}



var findCantidadInasistenciasBYMateria = function(id_estudiante){
    return sequelize.query(queries.inasistencia.findCantidadInasistenciasBYMateria,{bind:{id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT})
}

var findInasistenciasByCarga = function(id_estudiante,id_carga){
    return sequelize.query(queries.inasistencia.findInasistenciasByCarga,{bind:{id_carga:id_carga,id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT})
}
var findCantidadInasistenciasByCarga = function(id_carga){
    return sequelize.query(queries.inasistencia.findCantidadInasistenciasByCarga,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT})
}
var findInasistenciasByEstudiante = function(id_estudiante){
    return sequelize.query(queries.inasistencia.findInasistenciasByEstudiante,{bind:{id_estudiante:id_estudiante},type:sequelize.QueryTypes.SELECT})
}
var findInasistenciasByMateria = function(id_estudiante,id_materia){
    return sequelize.query(queries.inasistencia.findInasistenciasByMateria,{bind:{id_estudiante:id_estudiante,id_materia:id_materia},type:sequelize.QueryTypes.SELECT})
}

var updateEstadoInasistencia= function(inasistencia){
   var cadena="UPDATE inasistencia "+
    "SET estado_inasistencia = " + inasistencia.estado_inasistencia +
    " WHERE id_inasistencia = "+ inasistencia.id_inasistencia ;
 
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};
/*
var findNotasLogrosByEstudiante = function(id_usuario,id_materia,id_periodo){
    return sequelize.query(queries.nota_logro.findNotasLogrosByEstudiante,{bind:{id_usuario:id_usuario,id_materia:id_materia,id_periodo:id_periodo},type:sequelize.QueryTypes.SELECT})
}*/

module.exports.findInasistenciasByCarga=findInasistenciasByCarga;
module.exports.findCantidadInasistenciasByCarga=findCantidadInasistenciasByCarga;
module.exports.findInasistenciasByEstudiante=findInasistenciasByEstudiante;
module.exports.findInasistenciasByMateria =findInasistenciasByMateria ;
module.exports.updateEstadoInasistencia = updateEstadoInasistencia;
module.exports.addInasistencias = addInasistencias;
module.exports.findCantidadInasistenciasBYMateria = findCantidadInasistenciasBYMateria;
module.exports.findInasistenciasEstudianteByCarga = findInasistenciasEstudianteByCarga;

