var Models=require("../models/index");
var sequelize = Models.sequelize;

var queryFindActividadesByLogro = "SELECT * FROM actividad WHERE id_logro  = $id_logro ORDER BY id_actividad";
var queryFindActividadById = "SELECT * FROM actividad WHERE id_actividad = $id_actividad "

var queries={
  "actividad":{
    'findActividadesByLogro':queryFindActividadesByLogro, 
    'findActividadById':queryFindActividadById,
  }
};
var findActividadesByLogro = function(id_logro){
  return sequelize.query(queries.actividad.findActividadesByLogro,{bind:{id_logro:id_logro},type:sequelize.QueryTypes.SELECT})
};

var findActividadById = function(id_actividad){
  return sequelize.query(queries.actividad.findActividadById,{bind:{id_actividad:id_actividad},type:sequelize.QueryTypes.SELECT})
}

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

var updateActividades= function(actividades,t){
   var cadena="UPDATE actividad ";
   var cadenaporcentaje="";
   var cadenadescripcion="";
   var cadenawhere="";
   actividades.forEach(function(actividad,index){
       cadenaporcentaje+= "WHEN "+ actividad.id_actividad+" THEN "+actividad.porcentaje_actividad+" ";
       cadenadescripcion+= "WHEN "+actividad.id_actividad+" THEN '"+actividad.descripcion_actividad+"' ";
       if(index==actividades.length-1){
           console.log("ultimo registro");
           cadenawhere+=actividad.id_actividad;
       }
       else{
           console.log("registro");
           cadenawhere+=actividad.id_actividad+",";
       }
   });
   //console.log(cadenaporcentaje);
   //console.log(cadenadescripcion);
   cadena= cadena+" SET porcentaje_actividad = CASE id_actividad "+cadenaporcentaje+" END ";
   cadena= cadena+",descripcion_actividad = CASE id_actividad "+cadenadescripcion+" END ";
   cadena= cadena+" WHERE id_actividad IN("+cadenawhere+")";
   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.UPDATE, transaction: t
   });

};

var createActividad= function(actividad){
   var cadena="INSERT INTO actividad"+
    "(id_logro,porcentaje_actividad,nombre_actividad,descripcion_actividad) "+
    "VALUES ("+actividad.id_logro+","+actividad.porcentaje_actividad+",'"+actividad.nota_actividad+"','"+actividad.descripcion_actividad+"') RETURNING id_actividad";
   console.log(cadena);
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.INSERT
   });

};


var createActividades= function(actividades,t){
   var cadena="INSERT INTO actividad(id_logro,nombre_actividad,descripcion_actividad,porcentaje_actividad) VALUES ";
   var cadenaValores="";
   actividades.forEach(function(actividad,index){
      cadenaValores += "("+actividad.id_logro+",'"+actividad.nombre_actividad+"','"+actividad.descripcion_actividad+"',"+actividad.porcentaje_actividad+")";
       if(index==actividades.length-1){
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

var guardarActividadesTransaccion = function(deleteA,updateA,createA,cb){
  var deleteBandera = false;
  var updateBandera = false;
  var createBandera = false;
  console.log(updateA.length)
  console.log(deleteA.length)
  console.log(createA.length)

  if(deleteA.length != 0) deleteBandera = true;
  if(updateA.length != 0) updateBandera = true;
  if(createA.length != 0) createBandera = true;
  var value = 0;
  console.log("bandera update")
  console.log(updateBandera);
  console.log("bandera delete")
  console.log(deleteBandera);
  console.log("bandera creae")
  console.log(createBandera);

  if(createBandera && updateBandera && deleteBandera )value = 1;
  else if ( createBandera && updateBandera && !deleteBandera ) value=2;
  else if ( createBandera && !updateBandera && deleteBandera ) value=3;
  else if ( createBandera && !updateBandera && !deleteBandera ) value=4;
  else if ( !createBandera && updateBandera && deleteBandera ) value=5;
  else if ( !createBandera && updateBandera && !deleteBandera ) value=6;
  else if ( !createBandera && !updateBandera && deleteBandera ) value=7;
  else if ( !createBandera && !updateBandera && !deleteBandera ) value=8;

  sequelize.transaction({autocommit:false})
  .then(function(t){
    console.log("entro al primer then de transaccion");
    console.log(value);

    switch(value){
      case 1://C - U - D
        deleteActividades(deleteA,t)
        .then(function(dataDelete){
          console.log("entro al segundo then de transaccion")

          updateActividades(updateA,t)
          .then(function(dataUpdate){
            console.log("entro a el tercer then de la transaccion");
            createActividades(createA,t)
            .then(function(dataCreate){
              console.log("hizo todo")
              t.commit();
              cb({"msg":"Salio Bien"},null)
            }).catch(function(error){
              console.log("entro al error de create actividades");
              console.log(error);
              t.rollback();
              cb(null,error);
            });// cierra carch createActividades
          }).catch(function(error){
            console.log("entro al error de update actividades");
            console.log(error);
            t.rollback();
            cb(null,error);
          });// cierra catch updatre actividades
        }).catch(function(error){
          console.log("entro al error de eliminar actividades");
          console.log(error);
          t.rollback();
          cb(null,error);
        });//cierra catch
        break;

      case 2://C - U 
        updateActividades(updateA,t)
          .then(function(dataUpdate){
            console.log("entro a el tercer then de la transaccion");
            createActividades(createA,t)
            .then(function(dataCreate){
              console.log("hizo todo")
              t.commit();
              cb({"msg":"Salio Bien"},null)
            }).catch(function(error){
              console.log("entro al error de create actividades");
              console.log(error);
              t.rollback();
              cb(null,error);
            });// cierra carch createActividades
          }).catch(function(error){
            console.log("entro al error de update actividades");
            console.log(error);
            t.rollback();
            cb(null,error);
          });// cierra catch updatre actividades
          break;
      
      case 3://C - D
      deleteActividades(deleteA,t)
        .then(function(dataDelete){
          console.log("entro al segundo then de transaccion")
          createActividades(createA,t)
          .then(function(dataCreate){
            console.log("hizo todo")
            t.commit();
            cb({"msg":"Salio Bien"},null)
          }).catch(function(error){
            console.log("entro al error de create actividades");
            console.log(error);
            t.rollback();
            cb(null,error);
          });// cierra carch createActividades

        }).catch(function(error){
          console.log("entro al error de eliminar actividades");
          console.log(error);
          t.rollback();
          cb(null,error);
        });//cierra catch
        break;

      case 4://C
        console.log("entro al segundo then de transaccion")
          createActividades(createA,t)
          .then(function(dataCreate){
            console.log("hizo todo")
            t.commit();
            cb({"msg":"Salio Bien"},null)
          }).catch(function(error){
            console.log("entro al error de create actividades");
            console.log(error);
            t.rollback();
            cb(null,error);
          });// cierra carch createActividades
          break;

      case 5:// U - D

        deleteActividades(deleteA,t)
        .then(function(dataDelete){
          console.log("entro al segundo then de transaccion")
          updateActividades(updateA,t)
          .then(function(dataUpdate){
            console.log("hizo todo")
            t.commit();
            cb({"msg":"Salio Bien"},null)
          }).catch(function(error){
            console.log("entro al error de update actividades");
            console.log(error);
            t.rollback();
            cb(null,error);
          });// cierra catch updatre actividades
        }).catch(function(error){
          console.log("entro al error de eliminar actividades");
          console.log(error);
          t.rollback();
          cb(null,error);
        });//cierra catch
        break;

      case 6://U
        updateActividades(updateA,t)
        .then(function(dataUpdate){
          console.log("hizo todo")
          t.commit();
          cb({"msg":"Salio Bien"},null)
        }).catch(function(error){
          console.log("entro al error de update actividades");
          console.log(error);
          t.rollback();
          cb(null,error);
        });// cierra catch updatre actividades
        break;
      case 7: //D
         deleteActividades(deleteA,t)
        .then(function(dataDelete){
            console.log("hizo todo")
            t.commit();
            cb({"msg":"Salio Bien"},null)

        }).catch(function(error){
          console.log("entro al error de eliminar actividades");
          console.log(error);
          t.rollback();
          cb(null,error);
        });//cierra catch
        break;

      case 8:
          console.log("todos vacios");   
          t.rollback();
          cb(null,"todos vacios");
          break;

      default:
          console.log("default");
          t.rollback();
          cb(null,"defaut");
          break;
    }//cierra el siutch 
  })//cierra transaccion


  
/*
  sequelize.transaction({autocommit:false})
  .then(function(t){

    console.log("entro al primer then de transaccion");

    if(deleteA != []){
      /////delete con datos////////////
      console.log("delete con datos")
     
      if(updateA != []){
        console.log("update con datos")

        if(createA != []){
          console.log("update con datos")
        }else{
          console.log("create vacio")

        }
      }else{
        console.log("update vacio")

      }

      /////////cierra delete con datos
    }else{

       console.log("delete vacio")
       if(updateA != []){
        console.log("update con datos")

        if(createA != []){
          console.log("update con datos")
        }else{
          console.log("create vacio")

        }
      }else{
        console.log("update vacio")

      }
    }

    
    deleteActividades(deleteA,t)
    .then(function(dataDelete){
      console.log("entro al segundo then de transaccion")

      updateActividades(updateA,t)
      .then(function(dataUpdate){

        console.log("entro a el tercer then de la transaccion");

        createActividades(createA,t)
        .then(function(dataCreate){
          console.log("hizo todo")
          t.commit();
          cb({"msg":"Salio Bien"},null)
        }).catch(function(error){
          console.log("entro al error de create actividades");
          console.log(error);
          t.rollback();
          cb(null,error);

        });




      }).catch(function(error){
        console.log("entro al error de update actividades");
        console.log(error);
        t.rollback();
        cb(null,error);
      });
    }).catch(function(error){
      console.log("entro al error de eliminar actividades");
      console.log(error);
      t.rollback();
      cb(null,error);
    });//cierra catch
  });//trnsaccion
*/

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

var deleteActividades= function(actividades,t){
  var cadena="DELETE FROM actividad "+
     "WHERE id_actividad IN (" ;

  var cadenaValores="";
   actividades.forEach(function(actividad,index){
      cadenaValores += actividad.id_actividad;
       if(index==actividades.length-1){
           console.log("ultimo registro");
           cadenaValores+= ")";
       }
       else{
           console.log("registro");
           cadenaValores+= ",";
       }
   });
   cadena = cadena + cadenaValores
   console.log(cadenaValores)
  
 // return cadena;
  
   return sequelize.query(cadena,{type: sequelize.QueryTypes.DELETE,transaction: t});

};

var deleteActividad= function(id_actividad,t){
   var cadena="DELETE FROM actividad "+
     "WHERE id_actividad = "+ id_actividad ;
   
   return sequelize.query(cadena,{
     type: sequelize.QueryTypes.DELETE
   }
   );

};


module.exports.findActividadesByLogro=findActividadesByLogro;
module.exports.updateActividades=updateActividades;
module.exports.createActividad = createActividad;
module.exports.createActividades = createActividades;
module.exports.updateDescripcionActividad= updateDescripcionActividad;
module.exports.findActividadesByLogros=findActividadesByLogros
module.exports.deleteActividad=deleteActividad;
module.exports.findActividadById = findActividadById;
module.exports.deleteActividades = deleteActividades;
module.exports.guardarActividadesTransaccion = guardarActividadesTransaccion;

