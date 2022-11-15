import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice-styling',
  templateUrl: './invoice-styling.component.html',
})
export class InvoiceStylingComponent implements OnInit {
  @Input() block: any;
  className = '';
  styleModal = {
    backgroundColor: '#ffffff',
    color: '#000000',
  };

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  save() {
    this.block.name = this.className;
    this.block.styling = { ...this.block.styling, ...this.styleModal };
    this.modal.close();
  }
}
