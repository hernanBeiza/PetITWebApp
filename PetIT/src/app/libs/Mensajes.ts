export class Mensajes {

	public static validacionesLogin = {
	    'rut': {
			'required':			'El rut es obligatorio.',
			'minlength':		'El rut debe ser de al menos de 9 carácter de largo.',
			'invalidRut':		'El rut es inválido'
	    },
	    'contrasena': {
			'required':      'La Contraseña es obligatoria.',
			'minlength':     'La Contraseña debe ser de al menos de 8 carácter de largo.'
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

	public static validacionesProducto = {
		'nombre': {
			'required':      'El nombre del producto es obligatorio.'
		},
		'codigo': {
			'required':      'El código es obligatorio.',
			'minlength':     'El código debe ser de al menos de 8 carácter de largo',
			'maxlength':     'El código debe ser de a lo más 8 caracteres de largo'
		},
		'descripcion': {
			'required':      'La descripción es obligatoria.',
		}
	}

	public static validacionesCentro = {
		'idempresa': {
			'required': 	'La empresa es obligatoria.'
		},
		'nombre': {
			'required':  	'El nombre es obligatorio.',
			'minlength':  	'El nombre debe ser de al menos de 4 carácter de largo.'
		},
		'ubicacion': {
			'required':     'La ubicación es obligatoria.',
			'minlength':    'La ubicación debe ser de al menos de 4 carácter de largo.'
		},
		'team': {
			'required':     'El team es obligatorio.',
			'minlength':    'El team debe ser de al menos de 1 carácter de largo.'
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

	public static validacionesAnomalia = {
		'idanomaliaestado': {
			'required':      'El estado es obligatorio.'
		},
		'detalle': {
			'required':      'Los detalles son obligatorios.'
		},
	}

	public static validacionesInforme = {
		'idcentro': {
			'required':      'El centro es obligatorio.'
		},
		'idmodulo': {
			'required':      'El módulo es obligatorio.'
		},
		'descripcion': {
			'required':      'La descripción es obligatoria.'
		},
		'fecha': {
			'required':      'La fecha es obligatoria.'
		},
	}	

	public static validacionesInformeConsultar = {
		'idempresa': {
			'required':      'La empresa es obligatoria.'
		},
		'idcentro': {
			'required':      'El centro es obligatorio.'
		},
		'idmodulo': {
			'required':      'El módulo es obligatorio.'
		}
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

	public static validacionesIncidenciaTensor = {
		'idprofundidad': {
			'required':      'La profundidad es obligatoria.'
		},
		'idtensorestado': {
			'required':      'El estado del tensor es obligatorio.'
		},
		'coordenada': {
			'required': 	'La coordenada es obligatoria.',
			'minlength': 	'La coordenada debe ser al menos de 2 caracteres de largo.',
			'maxlength': 	'La coordenada debe ser de a los más 4 caracteres de largo.'
		},
		'descripcion': {
			'required':      'La descripción es obligatoria.'
		},
	}

}

