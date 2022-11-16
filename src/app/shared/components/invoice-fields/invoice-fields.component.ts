import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-invoice-fields',
  templateUrl: './invoice-fields.component.html',
})
export class InvoiceFieldsComponent implements OnInit, OnDestroy {
  @Input() block: any;
  @Input() tableFields: any;
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
  fields = [
    '{%CompanyName%}',
    '{%TaxIdentificationNumber%}',
    '{%PhoneNumber%}',
    '{%Address%}',
    '{%AgentArabicName%}',
    '{%AgentTaxCode%}',
    '{%AgentPhone%}',
    '{%AgentFullAdress%}',
    '{%InvoiceNumber%}',
    '{%PostedInvoiceNumber%}',
    '{%Date%}',
  ];
  htmlContent = '';

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.editor = new Editor();
    if (this?.tableFields) {
      this.fields = this.tableFields;
    }
    if (this.block?.htmlContent) {
      this.htmlContent = this.block?.htmlContent;
    } else {
      for (const field of this.block?.selectedFields) {
        this.htmlContent += `<p>${field}</p>`;
      }
    }
  }

  addToSelected(field: any): void {
    if (this.block?.selectedFields.includes(field)) {
      let index = this.block?.selectedFields.indexOf(field);
      this.block?.selectedFields.splice(index, 1);
      this.htmlContent = this.htmlContent.replace(`<p>${field}</p>`, '');
    } else {
      this.block?.selectedFields.push(field);
      this.htmlContent += `<p>${field}</p>`;
    }
  }
  changeInEditor(event: any): void {
    let newSelected: any = [];
    if (event) {
      let arr = event.split('%');
      for (let i = 0; i < arr.length; i++) {
        if (!/<[^>]*>/g.test(arr[i])) {
          newSelected = [...newSelected, `{%${arr[i]}%}`];
          this.block.selectedFields = newSelected;
        }
      }
    }
  }

  save(): void {
    this.block.htmlContent = this.htmlContent;
    this.modal.close();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
