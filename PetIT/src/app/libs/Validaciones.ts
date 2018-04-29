import { FormGroup, AbstractControl, FormControl, FormBuilder, Validators } from '@angular/forms';

export class Validaciones {
	public static isDV(control: AbstractControl): { [key: string]: any } {
		if (control.value) {
			if (control.value.match(/[0-9 k K]/)) {            
				return null;
			} else {            
				return { 'isDV': false };
			}
		}
	}
	public static isNumber(control: AbstractControl): { [key: string]: any } {
		if (control.value !=null) {
			//console.log(typeof control.value);
			let value:string = String(control.value);
			//console.log(control.value,control.value.match);
			if (value.match(/[0-9]/)) {            
				return null;				
			} else {
				return { 'isNumber': false };
			}
		}
	}
	public static isEmail(control: AbstractControl): { [key: string]: any } {
		if (control.value) {
		    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
			if (control.value.match(EMAIL_REGEXP)) {            
				return null;
			} else {            
				return { 'isEmail': false };
			}
		}
	}

	public static onValueChanged(data?: any, myForm?:FormGroup, formErrors?:any, messages?:any):any {
		if (!myForm) { return; }
		const form = myForm;
		for (const field in formErrors) {
			// Borrar errores previos si es que existe alguno
			formErrors[field] = '';
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages2 = messages[field];
				for (const key in control.errors) {
					//formErrors[field] += messages2[key] + '<br>';
					formErrors[field] += messages2[key] + ' ';
				}
			}
		}
		return formErrors;
	}
}
