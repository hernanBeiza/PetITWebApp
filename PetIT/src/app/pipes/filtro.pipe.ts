import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filtro'
})

@Injectable()
export class FiltroPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        console.log(field,value);
        
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }

        return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
    }
}