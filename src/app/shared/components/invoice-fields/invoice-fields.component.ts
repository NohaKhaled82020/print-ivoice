import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, toDoc, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-invoice-fields',
  templateUrl: './invoice-fields.component.html',
})
export class InvoiceFieldsComponent implements OnInit, OnDestroy {
  @Input() block: any;
  @Input() fields: any;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  htmlContentFields: any = [];
  htmlContent = '';

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.editor = new Editor();
    for (const field of this.block?.selectedFields) {
      this.htmlContentFields.push(`<p>${field}</p>`);
    }

    this.htmlContent = this.htmlContentFields.join('');
  }

  addToSelected(field: any): void {
    if (this.block?.selectedFields.includes(field)) {
      let index = this.block?.selectedFields.indexOf(field);
      this.block?.selectedFields.splice(index, 1);
      this.htmlContentFields.splice(index, 1);
    } else {
      this.block?.selectedFields.push(field);
      this.htmlContentFields.push(`<p>${field}</p>`);
    }
    this.htmlContent = this.htmlContentFields.join('');
  }

  save(): void {
    this.block.selectedFields = [];
    toDoc(this.htmlContent)['content'].map((el: any) => {
      if (el?.content) {
        this.block.selectedFields = [
          ...this.block.selectedFields,
          el.content[0].text,
        ];
      }
    });
    this.modal.close();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
