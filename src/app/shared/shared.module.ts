import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFieldsComponent } from './components/invoice-fields/invoice-fields.component';
import { InvoiceStylingComponent } from './components/invoice-styling/invoice-styling.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AngularDraggableModule } from 'ngx-draggable-resize';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ReplaceKeyPipe } from './pipes/replace-key.pipe';
import { InvoiceLineValue } from './pipes/invoiceLine-value.pipe';
import { InvoiceSettingsComponent } from './components/invoice-settings/invoice-settings.component';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [
    InvoiceFieldsComponent,
    InvoiceStylingComponent,
    ReplaceKeyPipe,
    SafeHtmlPipe,
    InvoiceLineValue,
    InvoiceSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ColorPickerModule,
    AngularDraggableModule,
    DragDropModule,
    EditorModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    InvoiceFieldsComponent,
    InvoiceStylingComponent,
    AngularDraggableModule,
    DragDropModule,
    ReplaceKeyPipe,
    SafeHtmlPipe,
    InvoiceLineValue,
    InvoiceSettingsComponent,
  ],
})
export class SharedModule {}
