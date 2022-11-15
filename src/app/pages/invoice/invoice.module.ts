import { NgModule } from '@angular/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';
import { InvoiceTemplateComponent } from './invoice-template/invoice-template.component';

@NgModule({
  declarations: [InvoicePreviewComponent, InvoiceTemplateComponent],
  imports: [SharedModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
