import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMascota'
})
export class FilterMascotaPipe implements PipeTransform {

  transform(items: Array<any>, searchText: string): Array<any> {
    //validaciones. Si el array esta vacio te sales
    if (!items.length) return [];
    //si no manda el texto te sales
    if (!searchText) return items;

    // AQUI LA LOGICA PARA ORDENAR LOS DATOS

    searchText = searchText.toLowerCase();
    return items.filter((item) =>
      item.mascota.toLowerCase().includes(searchText)
    );
  }  

}
