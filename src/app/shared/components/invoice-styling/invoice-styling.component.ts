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
    'backGround-color': '#ffffff',
    color: '#000000',
    top: 10,
    left: 10,
    width: 300,
    height: 200,
  };

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  save() {
    this.block.name = this.className;
    this.block.styling = { ...this.block.styling, ...this.styleModal };
    this.modal.close();
  }
}