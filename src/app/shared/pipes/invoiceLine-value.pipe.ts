import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceLineValue',
})
export class InvoiceLineValue implements PipeTransform {
  transform(value: string, invoiceLine?: any): any {
    const key = value.slice(2, -2);
    return invoiceLine ? invoiceLine[key] : key;
  }
}
