import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { InvoiceFieldsComponent } from '../shared/components/invoice-fields/invoice-fields.component';

@Component({
  selector: 'app-invoice-builder',
  templateUrl: './invoice-builder.component.html',
})
export class InvoiceBuilderComponent implements OnInit {
  start = 4;
  invoice: any = {
    id: 'theme-1',
    name: 'theme-1',
    size: 'A4',
    invoiceBlocks: [
      {
        id: `1`,
        name: `block-1`,
        selectedFields: ['{%CompanyName%}'],
        styling: {
          x: 20,
          y: 24,
          backgroundColor: '#ffffff',
          color: '#000000',
        },
        htmlContent: '<p>{%CompanyName%}</p>',
      },
      {
        id: `2`,
        name: `block-2`,
        selectedFields: ['{%CompanyName%}'],
        styling: {
          x: 580,
          y: 24,
          backgroundColor: '#ffffff',
          color: '#000000',
        },
        htmlContent: '<p>{%CompanyName%}</p>',
      },
      {
        id: `3`,
        name: `block-3`,
        selectedFields: ['{%CompanyName%}'],
        styling: {
          x: 20,
          y: 150,
          backgroundColor: '#ffffff',
          color: '#000000',
        },
        htmlContent: '<p>{%CompanyName%}</p>',
      },
      {
        id: `4`,
        name: `block-4`,
        selectedFields: ['{%CompanyName%}'],
        styling: {
          x: 580,
          y: 150,
          backgroundColor: '#ffffff',
          color: '#000000',
        },
        htmlContent: '<p>{%CompanyName%}</p>',
      },
      {
        id: `table`,
        name: `table-test`,
        selectedFields: ['{%ItemName%}', '{%ItemCode%}', '{%ItemUnit%}'],
        styling: {
          x: 225,
          y: 346,
          backgroundColor: '#ffffff',
          color: '#000000',
        },
        htmlContent:
          '<p>{%ItemName%}</p><p>{%ItemCode%}</p><p>{%ItemUnit%}</p>',
      },
    ],
  };

  constructor(public helpers: HelpersService, private modalService: NgbModal) {
    // check if invoice found in local storage same for api
    if (this.helpers.getItemFromLocalStorage('invoice')) {
      this.invoice = {};
      this.invoice = {
        ...this.invoice,
        ...this.helpers.getItemFromLocalStorage('invoice'),
      };
    }
    this.helpers.invoiceUI$.next(this.invoice);
  }

  ngOnInit(): void {}

  addNewBlock() {
    this.start += 1;
    const item = {
      id: `${this.start}`,
      name: `block-${this.start}`,
      selectedFields: [`{%PhoneNumber%}`],
      styling: {
        x: 332,
        y: 173,
        backgroundColor: '#ffffff',
        color: '#000000',
      },
      htmlContent: '<p>{%PhoneNumber%}</p>',
    };
    this.invoice.invoiceBlocks.push(item);
    this.helpers.invoiceUI$.next(this.invoice);
    const modalRef = this.modalService.open(InvoiceFieldsComponent, {
      windowClass: 'info-popup',
    });
    modalRef.componentInstance.block = item;
  }

  removeBlock(block: any) {
    let index = this.invoice.invoiceBlocks.indexOf(block);
    this.invoice.invoiceBlocks.splice(index, 1);
    this.helpers.invoiceUI$.next(this.invoice.invoiceBlocks);
  }
}
