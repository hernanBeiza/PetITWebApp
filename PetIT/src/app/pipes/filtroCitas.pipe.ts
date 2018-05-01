import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filtroCitas'
})

@Injectable()
export class FiltroCitasPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        //console.log(items,field,value);
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }
        //Buscar en el dueño del item a filtrar
        return items.filter(singleItem => 
            singleItem.dueno[field].toLowerCase().includes(value.toLowerCase()));            
    }
}