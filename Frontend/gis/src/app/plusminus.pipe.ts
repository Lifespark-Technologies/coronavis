import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plusminus'
})
export class PlusminusPipe implements PipeTransform {

  constructor(
    private decimalPipe: DecimalPipe
  ) {}

  transform(value: number, digitsInfo?: string): string {
    return `${value > 0 ? '+' : ''}${this.decimalPipe.transform(value, digitsInfo)}`;
  }

}
