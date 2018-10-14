export class Mensajes {

	public static validacionesLogin = {
	    'rut': {
			'required':			'El rut es obligatorio.',
			'minlength':		'El rut debe ser de al menos de 9 carácter de largo.',
			'maxlength':		'El rut es inválido.',
			'invalidRut':		'El rut es inválido.'
	    },
	    'contrasena': {
			'required':      'La contraseña es obligatoria.',
			'minlength':     'La contraseña debe ser de al menos de 7 carácter de largo.'
	    }
	};

	public static validacionesGenerarInforme = {
		'inicio': {
			'required':      'La fecha de inicio es obligatoria.'
		},
		'termino': {
			'required':      'La fecha de término es obligatoria.'
		}
	}

	public static validacionesAgendar = {
		'especialidad': {
			'required':      'La especialidad es obligatoria.'
		},
		'especialista': {
			'required':      'El especialista es obligatorio.'
		},
		'fecha': {
			'required':      'La fecha es obligatoria.'
		},
		'hora': {
			'required':      'La hora es obligatoria.'
		}
	}

	public static validacionesAgregarDueno = {
	    'rut': {
			'required':			'El rut es obligatorio.',
			'minlength':		'El rut debe ser de al menos de 9 carácter de largo.',
			'invalidRut':		'El rut es inválido.',
			'maxlength':		'El rut es inválido.',
	    },
		'nombres': {
			'required':			'El nombre del dueño es obligatorio.'
		},		
		'paterno': {
			'required':			'El apellido del dueño es obligatorio.'
		},		
		'materno': {
			'required':			'El apellido del dueño es obligatorio.'
		},		
		'comuna': {
			'required':			'La comuna es obligatoria.',
		},
		'direccion': {
			'required':			'La dirección es obligatoria.',
		},
		'telefono': {
			'required':			'El teléfono es obligatorio.',
		},
		'email': {
			'required':			'El email del dueño es obligatorio.',
			'email':			'El email del dueño es inválido.'
		},
		'contrasena': {
			'required':			'La contraseña es obligatoria.',
		},
		'contrasenaConfirmar': {
			'required':			'La confirmación de contraseña es obligatoria.',
			'MatchPassword':	'Las contraseñas no son iguales.',
		},
	}	


	public static validacionesBuscarDueno = {
	    'filtro': {
	    	'required': 		'El criterio de búsqueda es obligatorio.',
		},
	    'rut': {
			'required':			'El rut es obligatorio.',
			'minlength':		'El rut debe ser de al menos de 9 carácter de largo.',
			'maxlength':		'El rut es inválido.',
			'invalidRut':		'El rut es inválido.'
	    },
		'nombre': {
			'required':			'El nombre del dueño es obligatorio.'
		},
	}		
	
	
	public static validacionesAgregarMascota = {
		'rutDueno': {
			'required':			'El rut del dueño es obligatorio.',
			'minlength':		'El rut debe ser de al menos de 9 carácter de largo.',
			'maxlength':		'El rut es inválido.',
			'invalidRut':		'El rut es inválido.'
		},		
		'rutMascota': {
			'required':			'El rut del dueño es obligatorio.',
			'minlength':		'El rut debe ser de al menos de 9 carácter de largo.',
		},
		'tipo': {
			'required':			'El tipo es obligatorio.'
		},
		'raza': {
			'required':			'La raza es obligatoria.'
		},
		'nombre': {
			'required':			'El nombre de la mascota es obligatorio.'
		},
		'peso': {
			'required':			'El peso de la mascota es obligatorio.'
		},
		'edad': {
			'required':			'La edad de la mascota es obligatoria.'
		},
	}

	public static validacionesEnviarNotificacion = {
		'destinatarios': {
			'required':			'Al menos debe seleccionar un destinatario.',
		},	
		'imagen': {
			'required':			'La imagen es obligatoria.',
		},		
		'titulo': {
			'required':			'El título es obligatorio.',
			'minlength':		'El título debe ser de al menos de 9 carácter de largo.',
			'maxlength':		'El título no debe ser de más de 100 carácteres de largo.',
		},		
		'mensaje': {
			'required':			'El mensaje es obligatorio.'
		},
	}

	public static validacionesAsignar = {
		'idespecialidad': {
			'required': 	'La especialidad es obligatoria.'
		},
		'idespecialista': {
			'required':  	'El especialista es obligatorio.',
		},
		'fechaDesde': {
			'required':     'La fecha es obligatoria.',
		},
		'fechaHasta': {
			'required':     'La fecha es obligatorio.',
		},
	}

	public static validacionesModulo = {
		'nombre': {
			'required':     'El nombre es obligatorio.',
			'minlength':    'El nombre debe ser de al menos de 3 carácter de largo.'
		},
		'fondos': {
			'required':     'Los fondos es obligatoria.',
			'isNumber':		'Los fondos sólo pueden ser números'
		},
		'laterales': {
			'required': 	'Los laterales son obligatorios.',
			'isNumber': 	'Los laterales sólo pueden ser números'
		},
		'cabeceras': {
			'required': 	'Las cabeceras son obligatorias.',
			'isNumber':		'Las cabeceras sólo pueden ser números'
		},
		'separadores': {
			'required': 	'Los separadores son obligatorios.',
			'isNumber':		'Los separadores sólo pueden ser números'
		},
		'tamano': {
			'required':     'El tamaño es obligatorio.',
			'minlength':    'El tamaño debe ser de al menos de 3 caracteres de largo.'
		},
	}	
	
	public static validacionesIncidencia = {
		'profundidad': {
			'required': 	'La profundidad es obligatoria.',
			'minlength': 	'La profundidad debe ser al menos de 1 carácter de largo.',
			'isNumber': 	'La profundidad sólo puede ser en números'
		},
		'coordenada': {
			'required': 	'La coordenada es obligatoria.',
			'minlength': 	'La coordenada debe ser al menos de 2 caracteres de largo.',
			'maxlength': 	'La coordenada debe ser de a los más 4 caracteres de largo.'
		},
		'descripcion': {
			'required': 	'La descripción es obligatoria.'
		},
	}

}

