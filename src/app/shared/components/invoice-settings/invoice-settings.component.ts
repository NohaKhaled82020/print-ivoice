import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IFile } from '../../models/IFile.model';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-invoice-settings',
  templateUrl: './invoice-settings.component.html',
})
export class InvoiceSettingsComponent implements OnInit {
  @Input() invoice: any;
  invoiceSettingForm!: FormGroup;
  sizes = [
    'Letter',
    'Tabliod',
    'Legal',
    'Statement',
    'Executive',
    'A3',
    'A4',
    'A5',
    'B4(JIS)',
    'B5(JIS)',
  ];

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private helpers: HelpersService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  fillForm(imageData: IFile): void {
    const formGroup = this.invoiceSettingForm.controls['file'] as FormGroup;
    console.log(imageData);

    this.helpers.fillField(formGroup, 'fileData', imageData.fileData);
    this.helpers.fillField(formGroup, 'fileExtension', imageData.fileExtension);
    this.helpers.fillField(formGroup, 'filename', imageData.filename);
  }

  initForm(): void {
    console.log(this.invoice.file);

    let name = this.invoice.name;
    let size = this.invoice.size;
    let filename = this.invoice?.file?.filename;
    let fileExtension = this.invoice?.file?.fileExtension;
    let fileData = this.invoice?.file?.fileData;
    this.invoiceSettingForm = this.fb.group({
      name: [name, Validators.required],
      size: size,
      file: this.fb.group({
        filename: filename,
        fileExtension: fileExtension,
        fileData: fileData,
      }),
    });
  }

  submit(): void {
    this.invoice.name = this.invoiceSettingForm.value.name;
    this.invoice.file = this.invoiceSettingForm.value.file;
    this.modal.close();
  }
}
