import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceKey',
})
export class ReplaceKeyPipe implements PipeTransform {
  arr!: any;
  transform(value: string, invoiceData: any): any {
    if (value) {
      //get array of texts and keys as strings
      this.arr = value.split('%');
      for (let i = 0; i < this.arr.length; i++) {
        // check if it is text or key ,if key replace with value else remove '{' and '}' from text and return text
        this.arr[i] = !/<[^>]*>/g.test(this.arr[i])
          ? invoiceData[this.arr[i]]
          : this.arr[i].replace(/{|}/g, '');
      }
      return this.arr.join('');
    }
  }
}
