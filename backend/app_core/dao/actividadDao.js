var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindActividadesByLogro = "SELECT * FROM actividad WHERE id_logro  = $id_logro ORDER BY id_actividad";

var queries={
	"actividad":{
		'findActividadesByLogro':queryFindActividadesByLogro,	
	}
};
var findActividadesByLogro = function(id_logro){
	return sequelize.query(queries.actividad.findActividadesByLogro,{bind:{id_logro:id_logro},type:sequelize.QueryTypes.SELECT})
};

var findActividadesByLogros = function(ids_logro){
  console.log("este es ids_logro")
  console.log(ids_logro)
  var cadena = "SELECT * FROM actividad WHERE id_logro IN ("
  var ids = "";
  ids_logro.forEach(function (id_logro,index){
    if(index == ids_logro.length-1){
      //console.log(id_logro.id_logro)
      ids += id_logro.id_logro ;
    }else{
      ids += id_logro.id_logro + ",";
    }
  });
  cadena += ids + ") ORDER BY id_logro,id_actividad"
  return sequelize.query(cadena,{type:sequelize.QueryTypes.SELECT})
};

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

var createActividad= function(actividad){
   var cadena="INSERT INTO actividad"+
    "(id_logro,porcentaje_actividad,nombre_actividad,descripcion_actividad) "+
    "VALUES ("+actividad.id_logro+","+actividad.porcentaje_actividad+",'"+actividad.nota_actividad+"','"+actividad.descripcion_actividad+"')";
   console.log(cadena);
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.INSERT
   });

};
var updateDescripcionActividad= function(actividad){

   var cadena="UPDATE actividad "+
    "SET descripcion_actividad = '"+actividad.descripcion_actividad+"' "+
    "WHERE id_actividad = "+actividad.id_actividad;
   console.log(cadena);
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE
   });

};


module.exports.findActividadesByLogro=findActividadesByLogro;
module.exports.updatePorcentajesActividades=updatePorcentajesActividades;
module.exports.createActividad = createActividad;
module.exports.updateDescripcionActividad= updateDescripcionActividad;
module.exports.findActividadesByLogros=findActividadesByLogros
