import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.component.html',
})
export class InvoiceTemplateComponent implements OnInit {
  invoiceData: any = {
    Logo: '../../../../assets/logo.png',
    CompanyName: 'Ebtekar Company',
    TaxIdentificationNumber: '123456',
    PhoneNumber: '0101010101010',
    Address: 'cairo',
    AgentArabicName: 'customer 1',
    AgentTaxCode: '123456',
    AgentPhone: '0000',
    AgentFullAdress: 'kSA',
    InvoiceNumber: '2022-000001',
    PostedInvoiceNumber: '2022-000001',
    Date: '10-11-2022',
    invoiceLines: [
      {
        ItemCode: '1001',
        ItemName: 'item-1',
        ItemUnit: 'kilo',
        ItemPrice: 1000,
        Quantity: 5,
      },
      {
        ItemCode: '1002',
        ItemName: 'item-2',
        ItemUnit: 'gram',
        ItemPrice: 2000,
        Quantity: 10,
      },
    ],
  };
  invoiceTemplate!: any;
  constructor(private helpers: HelpersService) {}

  ngOnInit(): void {
    this.invoiceTemplate = this.helpers.getItemFromLocalStorage('invoice');
  }
}
