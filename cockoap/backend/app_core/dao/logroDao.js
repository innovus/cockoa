var Models = require("../models/index");
var sequelize = Models.sequelize;
var queryFindLogrosByCargaDocente = "SELECT * FROM logro WHERE id_carga_docente = $id_carga AND vigente_logro = 'S' ORDER BY id_logro";
var queryFindLogrosByMateriaAndPeriodo = "SELECT id_materia,id_logro, descripcion_logro, porcentaje_logro " + "FROM logro NATURAL JOIN carga_docente " + "NATURAL JOIN curso " + "WHERE  id_materia = $id_materia AND id_periodo= $id_periodo AND vigente_logro = 'S' " + " AND id_curso = " + "(SELECT id_curso FROM matricula WHERE id_estudiante = $id_estudiante AND vigente_matricula = 'S')" + " ORDER BY  id_logro";
var queries = {
    "logro": {
        'findLogrosByCargaDocente': queryFindLogrosByCargaDocente,
        'findLogrosByMateriaAndPeriodo': queryFindLogrosByMateriaAndPeriodo,
    }
};
var findLogrosByCargaDocente = function(id_carga) {
    return sequelize.query(queries.logro.findLogrosByCargaDocente, {
        bind: {
            id_carga: id_carga
        },
        type: sequelize.QueryTypes.SELECT
    });
}
var findLogrosByMateriaAndPeriodo = function(id_estudiante, id_materia, id_periodo) {
    console.log(queries.logro.findLogrosByMateriaAndPeriodo)
    return sequelize.query(queries.logro.findLogrosByMateriaAndPeriodo, {
        bind: {
            id_materia: id_materia,
            id_periodo: id_periodo,
            id_estudiante: id_estudiante
        },
        type: sequelize.QueryTypes.SELECT
    });
}
var updateDescripcionLogro = function(logro) {
    var cadena = "UPDATE logro " + "SET descripcion_logro = '" + logro.descripcion_logro + "' " + "WHERE id_logro = " + logro.id_logro;
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.UPDATE
    });
};
var deleteLogro = function(id_logro) {
    var cadena = "DELETE FROM logro " + "WHERE id_logro = " + id_logro;
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.DELETE
    });
};
var createLogro = function(logro) {
    var cadena = "INSERT INTO logro (id_carga_docente,descripcion_logro,porcentaje_logro) " + "VALUES (" + logro.id_carga_docente + ",'" + logro.descripcion_logro + "'," + logro.porcentaje_logro + ") RETURNING id_logro";
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.INSERT
    });
}
var updatePorcentajesLogros = function(logros) {
    var cadena = "UPDATE logro ";
    var cadenanombre = "";
    var cadenavalor = "";
    var cadenawhere = "";
    logros.forEach(function(logro, index) {
        cadenanombre += "WHEN " + logro.id_logro + " THEN " + logro.porcentaje_logro + " ";
        // cadenavalor+= "WHEN "+logro.id_logro+" THEN "+logro.valor+" ";
        if (index == logros.length - 1) {
            console.log("ultimo registro");
            cadenawhere += logro.id_logro;
        } else {
            console.log("registro");
            cadenawhere += logro.id_logro + ",";
        }
    });
    //console.log(cadenanombre);
    //console.log(cadenavalor);
    cadena = cadena + " SET porcentaje_logro = CASE id_logro " + cadenanombre + " END ";
    // cadena= cadena+",valor = CASE id_logro "+cadenavalor+" END ";
    cadena = cadena + " WHERE id_logro IN(" + cadenawhere + ")";
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.UPDATE
    });
};
var createLogros = function(logros, t) {
    var cadena = "INSERT INTO logro(id_carga_docente,descripcion_logro,porcentaje_logro) VALUES ";
    var cadenaValores = "";
    logros.forEach(function(logro, index) {
        cadenaValores += "(" + logro.id_carga_docente + ",'" + logro.descripcion_logro + "'," + logro.porcentaje_logro + ")";
        if (index == logros.length - 1) {
            console.log("ultimo registro");
        } else {
            console.log("registro");
            cadenaValores += ",";
        }
    });
    cadena = cadena + cadenaValores
    console.log(cadenaValores)
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.INSERT
    });
};
var updateLogros = function(logros, t) {
    var cadena = "UPDATE logro ";
    var cadenaporcentaje = "";
    var cadenadescripcion = "";
    var cadenawhere = "";
    logros.forEach(function(logro, index) {
        cadenaporcentaje += "WHEN " + logro.id_logro + " THEN " + logro.porcentaje_logro + " ";
        cadenadescripcion += "WHEN " + logro.id_logro + " THEN '" + logro.descripcion_logro + "' ";
        if (index == logros.length - 1) {
            console.log("ultimo registro");
            cadenawhere += logro.id_logro;
        } else {
            console.log("registro");
            cadenawhere += logro.id_logro + ",";
        }
    });
    //console.log(cadenaporcentaje);
    //console.log(cadenadescripcion);
    cadena = cadena + " SET porcentaje_logro = CASE id_logro " + cadenaporcentaje + " END ";
    cadena = cadena + ",descripcion_logro = CASE id_logro " + cadenadescripcion + " END ";
    cadena = cadena + " WHERE id_logro IN(" + cadenawhere + ")";
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.UPDATE,
        transaction: t
    });
};
var deleteLogros = function(logros, t) {
    var cadena = "DELETE FROM logro " + "WHERE id_logro IN (";
    var cadenaValores = "";
    logros.forEach(function(logro, index) {
        cadenaValores += logro.id_logro;
        if (index == logros.length - 1) {
            console.log("ultimo registro");
            cadenaValores += ")";
        } else {
            console.log("registro");
            cadenaValores += ",";
        }
    });
    cadena = cadena + cadenaValores
    console.log(cadenaValores)
        // return cadena;
    return sequelize.query(cadena, {
        type: sequelize.QueryTypes.DELETE,
        transaction: t
    });
};
var guardarLogrosTransaccion = function(deleteL, updateL, createL, cb) {
    var deleteBandera = false;
    var updateBandera = false;
    var createBandera = false;
    console.log(updateL.length)
    console.log(deleteL.length)
    console.log(createL.length)
    if (deleteL.length != 0) deleteBandera = true;
    if (updateL.length != 0) updateBandera = true;
    if (createL.length != 0) createBandera = true;
    var value = 0;
    console.log("bandera update")
    console.log(updateBandera);
    console.log("bandera delete")
    console.log(deleteBandera);
    console.log("bandera creae")
    console.log(createBandera);
    if (createBandera && updateBandera && deleteBandera) value = 1;
    else if (createBandera && updateBandera && !deleteBandera) value = 2;
    else if (createBandera && !updateBandera && deleteBandera) value = 3;
    else if (createBandera && !updateBandera && !deleteBandera) value = 4;
    else if (!createBandera && updateBandera && deleteBandera) value = 5;
    else if (!createBandera && updateBandera && !deleteBandera) value = 6;
    else if (!createBandera && !updateBandera && deleteBandera) value = 7;
    else if (!createBandera && !updateBandera && !deleteBandera) value = 8;
    sequelize.transaction({
            autocommit: false
        }).then(function(t) {
            console.log("entro al primer then de transaccion");
            console.log(value);
            switch (value) {
                case 1: //C - U - D
                    deleteLogros(deleteL, t).then(function(dataDelete) {
                        console.log("entro al segundo then de transaccion")
                        updateLogros(updateL, t).then(function(dataUpdate) {
                            console.log("entro a el tercer then de la transaccion");
                            createLogros(createL, t).then(function(dataCreate) {
                                console.log("hizo todo")
                                t.commit();
                                cb({
                                    "msg": "Salio Bien"
                                }, null)
                            }).catch(function(error) {
                                console.log("entro al error de create Logros");
                                console.log(error);
                                t.rollback();
                                cb(null, error);
                            }); // cierra carch createLogros
                        }).catch(function(error) {
                            console.log("entro al error de update Logros");
                            console.log(error);
                            t.rollback();
                            cb(null, error);
                        }); // cierra catch updatre Logros
                    }).catch(function(error) {
                        console.log("entro al error de eliminar Logros");
                        console.log(error);
                        t.rollback();
                        cb(null, error);
                    }); //cierra catch
                    break;
                case 2: //C - U 
                    updateLogros(updateL, t).then(function(dataUpdate) {
                        console.log("entro a el tercer then de la transaccion");
                        createLogros(createL, t).then(function(dataCreate) {
                            console.log("hizo todo")
                            t.commit();
                            cb({
                                "msg": "Salio Bien"
                            }, null)
                        }).catch(function(error) {
                            console.log("entro al error de create Logros");
                            console.log(error);
                            t.rollback();
                            cb(null, error);
                        }); // cierra carch createLogros
                    }).catch(function(error) {
                        console.log("entro al error de update Logros");
                        console.log(error);
                        t.rollback();
                        cb(null, error);
                    }); // cierra catch updatre Logros
                    break;
                case 3: //C - D
                    deleteLogros(deleteL, t).then(function(dataDelete) {
                        console.log("entro al segundo then de transaccion")
                        createLogros(createL, t).then(function(dataCreate) {
                            console.log("hizo todo")
                            t.commit();
                            cb({
                                "msg": "Salio Bien"
                            }, null)
                        }).catch(function(error) {
                            console.log("entro al error de create Logros");
                            console.log(error);
                            t.rollback();
                            cb(null, error);
                        }); // cierra carch createLogros
                    }).catch(function(error) {
                        console.log("entro al error de eliminar Logros");
                        console.log(error);
                        t.rollback();
                        cb(null, error);
                    }); //cierra catch
                    break;
                case 4: //C
                    console.log("entro al segundo then de transaccion")
                    createLogros(createL, t).then(function(dataCreate) {
                        console.log("hizo todo")
                        t.commit();
                        cb({
                            "msg": "Salio Bien"
                        }, null)
                    }).catch(function(error) {
                        console.log("entro al error de create Logros");
                        console.log(error);
                        t.rollback();
                        cb(null, error);
                    }); // cierra carch createLogros
                    break;
                case 5: // U - D
                    deleteLogros(deleteL, t).then(function(dataDelete) {
                        console.log("entro al segundo then de transaccion")
                        updateLogros(updateL, t).then(function(dataUpdate) {
                            console.log("hizo todo")
                            t.commit();
                            cb({
                                "msg": "Salio Bien"
                            }, null)
                        }).catch(function(error) {
                            console.log("entro al error de update Logros");
                            console.log(error);
                            t.rollback();
                            cb(null, error);
                        }); // cierra catch updatre Logros
                    }).catch(function(error) {
                        console.log("entro al error de eliminar Logros");
                        console.log(error);
                        t.rollback();
                        cb(null, error);
                    }); //cierra catch
                    break;
                case 6: //U
                    updateLogros(updateL, t).then(function(dataUpdate) {
                        console.log("hizo todo")
                        t.commit();
                        cb({
                            "msg": "Salio Bien"
                        }, null)
                    }).catch(function(error) {
                        console.log("entro al error de update Logros");
                        console.log(error);
                        t.rollback();
                        cb(null, error);
                    }); // cierra catch updatre Logros
                    break;
                case 7: //D
                    deleteLogros(deleteL, t).then(function(dataDelete) {
                        console.log("hizo todo");
                        t.commit();
                        cb({
                            "msg": "Salio Bien"
                        }, null)
                    }).catch(function(error) {
                        console.log("entro al error de eliminar Logros");
                        console.log(error);
                        t.rollback();
                        cb(null, error);
                    }); //cierra catch
                    break;
                case 8:
                    console.log("todos vacios");
                    t.rollback();
                    cb(null, "todos vacios");
                    break;
                default:
                    console.log("default");
                    t.rollback();
                    cb(null, "defaut");
                    break;
            } //cierra el siutch 
        }) //cierra transaccion
}
module.exports.findLogrosByCargaDocente = findLogrosByCargaDocente;
module.exports.findLogrosByMateriaAndPeriodo = findLogrosByMateriaAndPeriodo;
module.exports.updateDescripcionLogro = updateDescripcionLogro;
module.exports.deleteLogro = deleteLogro;
module.exports.updatePorcentajesLogros = updatePorcentajesLogros;
module.exports.createLogro = createLogro;
module.exports.guardarLogrosTransaccion = guardarLogrosTransaccion;