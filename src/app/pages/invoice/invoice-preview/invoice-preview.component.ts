import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { InvoiceFieldsComponent } from 'src/app/shared/components/invoice-fields/invoice-fields.component';
import { InvoiceStylingComponent } from 'src/app/shared/components/invoice-styling/invoice-styling.component';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
})
export class InvoicePreviewComponent implements OnInit {
  fields = [
    'CompanyName',
    'TaxIdentificationNumber',
    'PhoneNumber',
    'Address',
    'Agent.ArabicName',
    'Agent.TaxCode',
    'Agent.Phone',
    'Agent.FullAdress',
  ];
  invoiceSelectedFields: any[] = [];

  constructor(public helpers: HelpersService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.helpers.invoiceLayoutBlocks$
      .pipe(
        tap((res) => {
          if (res) {
            this.invoiceSelectedFields = res;
          }
        })
      )
      .toPromise();
  }

  showInvoiceBlock(): void {
    this.helpers.themeBlocks$.next(true);
  }
  openModalInfo(block: any): void {
    const modalRef = this.modalService.open(InvoiceFieldsComponent, {
      windowClass: 'info-popup',
    });
    modalRef.componentInstance.block = block;
    modalRef.componentInstance.fields = this.fields;
  }
  openStylingModal(block: any): void {
    const modalRef = this.modalService.open(InvoiceStylingComponent, {
      windowClass: 'styling-popup',
    });
    modalRef.componentInstance.block = block;
  }

  onDragEnd(event: any, item: any) {
    console.log('onMoveEnd', event);
    // console.log(item);
  }
  //

  onResizeStop(event: any, item: any) {
    console.log('onResizeStop', event);
    item.styling.width = event.size.width;
    item.styling.height = event.size.height;
    // console.log(item);
  }

  SaveInvoice() {
    console.log(this.invoiceSelectedFields);
    this.helpers.setItemToLocalStorage('invoice', this.invoiceSelectedFields);
  }
}
