import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice-fields',
  templateUrl: './invoice-fields.component.html',
})
export class InvoiceFieldsComponent implements OnInit {
  @Input() block: any;
  @Input() tableFields: any;
  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ font: [] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ direction: 'rtl' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['clean'],
        ['link', 'image'],
      ],
    },
  };

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
      this.htmlContent = !this.htmlContent
        ? `<p>${field}</p>`
        : this.htmlContent + `<p>${field}</p>`;
    }
  }

  changeInEditor(event: any): void {
    let newSelected: any = [];
    let arr = event.htmlValue?.split('%');
    for (let i = 0; i < arr?.length; i++) {
      if (!/<[^>]*>/g.test(arr[i])) {
        newSelected = [...newSelected, `{%${arr[i]}%}`];
      }
    }
    this.block.selectedFields = newSelected;
  }

  save(): void {
    this.block.htmlContent = this.htmlContent;
    this.modal.close();
  }
}
