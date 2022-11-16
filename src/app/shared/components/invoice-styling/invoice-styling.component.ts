import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice-styling',
  templateUrl: './invoice-styling.component.html',
})
export class InvoiceStylingComponent implements OnInit {
  @Input() block: any;
  invoiceStylingForm!: FormGroup;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let name = this.block.name;
    let backgroundColor = this.block.styling.backgroundColor;
    let color = this.block.styling.color;
    this.invoiceStylingForm = this.fb.group({
      name: [name, Validators.required],
      styling: this.fb.group({
        backgroundColor: backgroundColor,
        color: color,
      }),
    });
  }

  submit(): void {
    this.block.name = this.invoiceStylingForm.value.name;
    this.block.styling = {
      ...this.block.styling,
      ...this.invoiceStylingForm.value.styling,
    };
    this.modal.close();
  }
}
