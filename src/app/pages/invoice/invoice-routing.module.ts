import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';
import { InvoiceTemplateComponent } from './invoice-template/invoice-template.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicePreviewComponent,
  },
  {
    path: 'invoice-template',
    component: InvoiceTemplateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
