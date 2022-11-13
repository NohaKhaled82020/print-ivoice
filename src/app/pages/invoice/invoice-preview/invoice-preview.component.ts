import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPosition } from 'ngx-draggable-resize';
import { tap } from 'rxjs';
import { InvoiceFieldsComponent } from 'src/app/shared/components/invoice-fields/invoice-fields.component';
import { InvoiceStylingComponent } from 'src/app/shared/components/invoice-styling/invoice-styling.component';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
})
export class InvoicePreviewComponent implements OnInit {
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
  }
  openStylingModal(block: any): void {
    const modalRef = this.modalService.open(InvoiceStylingComponent, {
      windowClass: 'styling-popup',
    });
    modalRef.componentInstance.block = block;
  }

  //new
  dragEnd(event: CdkDragEnd, item: any) {
    item.styling.x = event.source.getFreeDragPosition().x + item.styling.x;
    item.styling.y = event.source.getFreeDragPosition().y + item.styling.y;
    event.source._dragRef.reset();
    console.log(item);
  }

  onResizeStop(event: any, item: any) {
    console.log('onResizeStop', event);
    // item.styling.width = event.size.width;
    // item.styling.height = event.size.height;
  }

  SaveInvoice() {
    console.log(this.invoiceSelectedFields);
    this.helpers.setItemToLocalStorage('invoice', this.invoiceSelectedFields);
  }
}
