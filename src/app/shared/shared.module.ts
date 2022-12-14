import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFieldsComponent } from './components/invoice-fields/invoice-fields.component';
import { InvoiceStylingComponent } from './components/invoice-styling/invoice-styling.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'primeng/colorpicker';
import { NgxEditorModule } from 'ngx-editor';
import { AngularDraggableModule } from 'ngx-draggable-resize';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [InvoiceFieldsComponent, InvoiceStylingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxEditorModule,
    ColorPickerModule,
    AngularDraggableModule,
    DragDropModule,
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
  ],
})
export class SharedModule {}
