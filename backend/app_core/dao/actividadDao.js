var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindActividadesByLogro = "SELECT * FROM actividad WHERE id_logro  = $id_logro ORDER BY id_actividad"

var queries={
	"actividad":{
		'findActividadesByLogro':queryFindActividadesByLogro,	
	}
};
var findActividadesByLogro = function(id_logro){
	return sequelize.query(queries.actividad.findActividadesByLogro,{bind:{id_logro:id_logro},type:sequelize.QueryTypes.SELECT})
}

var updatePorcentajesActividades= function(actividades){
   var cadena="UPDATE actividad ";
   var cadenanombre="";
   var cadenavalor="";
   var cadenawhere="";
   actividades.forEach(function(actividad,index){
       cadenanombre+= "WHEN "+ actividad.id_actividad+" THEN "+actividad.porcentaje_actividad+" ";
      // cadenavalor+= "WHEN "+actividad.id_actividad+" THEN "+actividad.valor+" ";
       if(index==actividades.length-1){
           console.log("ultimo registro");
           cadenawhere+=actividad.id_actividad;
       }
       else{
           console.log("registro");
           cadenawhere+=actividad.id_actividad+",";
       }
   });
   //console.log(cadenanombre);
   //console.log(cadenavalor);
   cadena= cadena+" SET porcentaje_actividad = CASE id_actividad "+cadenanombre+" END ";
  // cadena= cadena+",valor = CASE id_actividad "+cadenavalor+" END ";
   cadena= cadena+" WHERE id_actividad IN("+cadenawhere+")";
   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};


module.exports.findActividadesByLogro=findActividadesByLogro;
module.exports.updatePorcentajesActividades=updatePorcentajesActividades;

