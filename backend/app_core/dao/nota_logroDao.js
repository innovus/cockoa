var Models=require("../models/index");
var sequelize = Models.sequelize;

var queriFindNotasLogrosByCarga = "SELECT id_estudiante,id_logro, nota_logro "+
	"FROM nota_logro NATURAL JOIN logro "+
	"WHERE id_carga_docente = $id_carga "+
	"ORDER BY id_estudiante";
var queryFindNotasLogrosByEstudiante = "SELECT id_logro, nota_logro FROM nota_logro "+ 
	"NATURAL JOIN logro  NATURAL JOIN carga_docente "+ 
	"WHERE id_estudiante = "+
		"(SELECT estudiante.id_estudiante FROM usuario "+ 
		"NATURAL JOIN persona NATURAL JOIN estudiante WHERE "+
		"usuario.id_usuario = $id_usuario) "+
	"AND id_materia= $id_materia AND id_periodo= $id_periodo";


var queries={
	"nota_logro":{
		'findNotasLogrosByCarga':queriFindNotasLogrosByCarga,
		'findNotasLogrosByEstudiante':queryFindNotasLogrosByEstudiante,
	}
};
var findNotasLogrosByCarga = function(id_carga){
	return sequelize.query(queries.nota_logro.findNotasLogrosByCarga,{bind:{id_carga:id_carga},type:sequelize.QueryTypes.SELECT})
}
var findNotasLogrosByEstudiante = function(id_usuario,id_materia,id_periodo){
	return sequelize.query(queries.nota_logro.findNotasLogrosByEstudiante,{bind:{id_usuario:id_usuario,id_materia:id_materia,id_periodo:id_periodo},type:sequelize.QueryTypes.SELECT})
}
var insertNotasLogros= function(notas_logro){
   var cadena="INSERT INTO nota_logro(id_logro,nota_logro,id_estudiante) VALUES ";
   var cadenaValores="";
   notas_logro.forEach(function(nota_logro,index){
   		cadenaValores += "("+nota_logro.id_logro+","+nota_logro.nota_logro+",'"+nota_logro.id_estudiante+"')";
       if(index==notas_logro.length-1){
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
var updateNotaLogro= function(nota_logro){
   var cadena="UPDATE nota_logro "+
    "SET nota_logro = " + nota_logro.nota_logro +
    " WHERE id_estudiante = '"+nota_logro.id_estudiante+
    "' AND id_logro = "+nota_logro.id_logro ;

   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};

module.exports.findNotasLogrosByCarga=findNotasLogrosByCarga;
module.exports.findNotasLogrosByEstudiante=findNotasLogrosByEstudiante;
module.exports.insertNotasLogros = insertNotasLogros;
module.exports.updateNotaLogro =updateNotaLogro;
