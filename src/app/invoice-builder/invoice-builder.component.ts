import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-invoice-builder',
  templateUrl: './invoice-builder.component.html',
})
export class InvoiceBuilderComponent implements OnInit {
  start = 1;
  invoice = [
    {
      id: `${this.start}`,
      name: `block-${this.start}`,
      selectedFields: ['CompanyName'],
      styling: {
        'background-color': '#000',
        color: '#fff',
        position: 'absolute',
        top: 20,
        left: 20,
        width: 220,
        height: 200,
      },
    },
  ];
  constructor(public helpers: HelpersService) {
    this.helpers.invoiceLayoutBlocks$.next(this.invoice);
  }

  ngOnInit(): void {
    console.log(this.invoice);
  }

  addNewBlock() {
    this.start += 1;
    this.invoice.push({
      id: `${this.start}`,
      name: `block-${this.start}`,
      selectedFields: ['CompanyName'],
      styling: {
        'background-color': '#000',
        color: '#fff',
        position: 'absolute',
        top: Math.random() * (1122.45 - 200),
        left: Math.random() * (793.7 - 220),
        width: 220,
        height: 200,
      },
    });
    console.log(this.invoice);

    this.helpers.invoiceLayoutBlocks$.next(this.invoice);
  }
}
