import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice-settings',
  templateUrl: './invoice-settings.component.html',
})
export class InvoiceSettingsComponent implements OnInit {
  @Input() invoice: any;
  invoiceSettingForm!: FormGroup;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let name = this.invoice.name;
    let backgroundColor = this.invoice.styling.backgroundColor;
    this.invoiceSettingForm = this.fb.group({
      name: [name, Validators.required],
      styling: this.fb.group({
        backgroundColor: backgroundColor,
      }),
    });
  }

  submit(): void {
    this.invoice.name = this.invoiceSettingForm.value.name;
    this.invoice.styling = {
      ...this.invoice.styling,
      ...this.invoiceSettingForm.value.styling,
    };
    this.modal.close();
  }
}
