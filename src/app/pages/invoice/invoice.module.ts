import { NgModule } from '@angular/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';

@NgModule({
  declarations: [InvoicePreviewComponent],
  imports: [SharedModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
