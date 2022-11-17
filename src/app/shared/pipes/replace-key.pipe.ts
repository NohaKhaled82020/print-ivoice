import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceKey',
})
export class ReplaceKeyPipe implements PipeTransform {
  arr!: any;
  transform(value: string, invoiceData?: any): any {
    if (value) {
      this.arr = value.split('%');
      for (let i = 0; i < this.arr.length; i++) {
        this.arr[i] = /<[^>]*>/g.test(this.arr[i])
          ? this.arr[i].replace(/{|}/g, '')
          : invoiceData
          ? invoiceData[this.arr[i]]
          : `{%${this.arr[i]}%}`;
      }
      return this.arr.join('');
    }
  }
}
