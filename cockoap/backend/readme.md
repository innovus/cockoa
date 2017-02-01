#Notas Logros Por carga Docente
{
  id_estudiante:{
    id_logro:nota_logro,
    .........
  },
  ........
}
##ejemplo
{
	15:{
		'3':'3.3',
		'4':'4,3',
		},
	12:{
		'3':'3.3',
		'4':'4,3',
	}
}


#Notas Actividades por carga docente

{
  id_estudiante:{
    id_logro:{
      id_actividad:nota_actividad,
      ............
  },
  ......
},
........
}

##ejemplo

{
	'15':{
		'3':{
      '1':'4'
      '2':'5'
    },{
      '1':'4'
      '2':'5'
    }
  },
  '16':{
    '3':{
      '1':'4'
      '2':'5'
    },{
      '1':'4'
      '2':'5'
    }
  }
}

#logros
[
  {
    "id_logro": 1,
    "id_carga_docente": 1,
    "id_periodo": 1,
    "nombre_logro": "actividades",
    "descripcion_logro": "realizar actividades en clases",
    "porcentaje_logro": "50"
  },
  {
    "id_logro": 2,
    "id_carga_docente": 1,
    "id_periodo": 1,
    "nombre_logro": "examenes",
    "descripcion_logro": "realizar examenes",
    "porcentaje_logro": "25"
  },
  {
    "id_logro": 3,
    "id_carga_docente": 1,
    "id_periodo": 1,
    "nombre_logro": "Prueba",
    "descripcion_logro": "prueba",
    "porcentaje_logro": "25"
  }
]

#actividades

[
  {
    "id_actividad": 9,
    "id_logro": 1,
    "nombre_actividad": "Examen",
    "descripcion_actividad": "Examen del segundo indicador del logro",
    "porcentaje_actividad": "100"
  }
]	

//estudiantes
Cabeceras{}

estudiantes{}


