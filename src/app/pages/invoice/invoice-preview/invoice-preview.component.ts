import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { InvoiceFieldsComponent } from 'src/app/shared/components/invoice-fields/invoice-fields.component';
import { InvoiceSettingsComponent } from 'src/app/shared/components/invoice-settings/invoice-settings.component';
import { InvoiceStylingComponent } from 'src/app/shared/components/invoice-styling/invoice-styling.component';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
})
export class InvoicePreviewComponent implements OnInit {
  invoice: any;
  tableFields = [
    '{%ItemCode%}',
    '{%ItemName%}',
    '{%ItemUnit%}',
    '{%ItemPrice%}',
    '{%Quantity%}',
  ];

  constructor(
    public helpers: HelpersService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.helpers.invoiceUI$
      .pipe(
        tap((res: any) => {
          this.invoice = res;
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
    if (block.id == 'table') {
      modalRef.componentInstance.tableFields = this.tableFields;
    }
  }
  openStylingModal(block: any): void {
    const modalRef = this.modalService.open(InvoiceStylingComponent, {
      windowClass: 'styling-popup',
    });
    modalRef.componentInstance.block = block;
  }

  dragEnd(event: CdkDragEnd, item: any) {
    item.styling.x = event.source.getFreeDragPosition().x + item.styling.x;
    item.styling.y = event.source.getFreeDragPosition().y + item.styling.y;
    event.source._dragRef.reset();
  }

  onResizeStop(event: any, item: any) {
    item.styling.width = event.size.width;
  }

  invoiceSettings() {
    const modalRef = this.modalService.open(InvoiceSettingsComponent);
    modalRef.componentInstance.invoice = this.invoice;
  }

  SaveInvoice() {
    this.helpers.setItemToLocalStorage('invoice', this.invoice);
    this.router.navigateByUrl('/invoice-template');
  }
}
