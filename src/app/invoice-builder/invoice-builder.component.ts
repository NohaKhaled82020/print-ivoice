import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { InvoiceFieldsComponent } from '../shared/components/invoice-fields/invoice-fields.component';

@Component({
  selector: 'app-invoice-builder',
  templateUrl: './invoice-builder.component.html',
})
export class InvoiceBuilderComponent implements OnInit {
  start = 4;
  invoice = [
    {
      id: `1`,
      name: `block-1`,
      selectedFields: ['CompanyName'],
      styling: {
        x: 20,
        y: 24,
      },
    },
    {
      id: `2`,
      name: `block-2`,
      selectedFields: ['CompanyName'],
      styling: {
        x: 643.0250701904297,
        y: 24,
      },
    },
    {
      id: `2`,
      name: `block-3`,
      selectedFields: ['CompanyName'],
      styling: {
        x: 20,
        y: 150,
      },
    },
    {
      id: `2`,
      name: `block-4`,
      selectedFields: ['CompanyName'],
      styling: {
        x: 643.0250701904297,
        y: 150,
      },
    },
    {
      id: `table`,
      name: `table-test`,
      selectedFields: ['column 1', 'column 1', 'column 3', 'column 4'],
      styling: {
        x: 225,
        y: 346,
      },
    },
  ];
  constructor(public helpers: HelpersService, private modalService: NgbModal) {
    this.helpers.invoiceLayoutBlocks$.next(this.invoice);
  }

  ngOnInit(): void {}

  addNewBlock() {
    this.start += 1;
    const item = {
      id: `${this.start}`,
      name: `block-${this.start}`,
      selectedFields: ['PhoneNumber'],
      styling: {
        x: 332,
        y: 173,
      },
    };

    this.invoice.push(item);
    this.helpers.invoiceLayoutBlocks$.next(this.invoice);

    const modalRef = this.modalService.open(InvoiceFieldsComponent, {
      windowClass: 'info-popup',
    });
    modalRef.componentInstance.block = item;
  }
}
