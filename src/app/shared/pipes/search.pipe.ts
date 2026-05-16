import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, properties: string[] = ['name']): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    const lowerTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      return properties.some(property => {
        if (item[property]) {
          return item[property].toString().toLowerCase().includes(lowerTerm);
        }
        return false;
      });
    });
  }
}
