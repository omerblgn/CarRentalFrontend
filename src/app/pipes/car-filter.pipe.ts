import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilter',
  standalone: true,
})
export class CarFilterPipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: CarDetail) =>
            c.brandName.toLocaleLowerCase().includes(filterText) ||
            c.carName.toLocaleLowerCase().includes(filterText),
        )
      : value;
  }
}
