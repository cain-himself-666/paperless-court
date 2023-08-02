import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CasesServices } from '../cases.service';
import { URL } from 'src/environment/environment';
@Component({
  selector: 'app-case-files',
  templateUrl: './case-files.component.html',
  styleUrls: ['./case-files.component.css']
})
export class CaseFilesComponent {
  @ViewChild('pdfViewer', { static: false}) public pdfViewer: any;
  @Output() routeCauseList = new EventEmitter<{status: boolean}>();
  @Input() cnr: string = '';
  details: any;
  orders: any = [];
  docs:any = [];
  case_id:string = '';
  doc_id:string = '';
  url:string = '';
  selected_doc: number = 0;
  constructor(private casesService: CasesServices){}
  ngOnInit(): void{
    this.onGetDetails();
    setTimeout(() => {
      this.selected_doc = this.docs[0].doc_id;
      this.onUpdateUrl(this.docs[0].doc_id, this.docs[0].document_type, this.docs[0].doc_name);
    }, 300);
  }
  onGetDetails(){
    this.casesService.view_docs(this.cnr).subscribe({
      next: data => {
        this.docs = data.docs;
        this.case_id = data.details.case_id;
        this.details = data.details;
      }
    })
    this.casesService.get_orders(this.cnr).subscribe({
      next: data => {
        this.orders = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onUpdateUrl(doc_id: string,document_type:string, document_name: string){
    this.selected_doc = parseInt(doc_id);
    this.url = `${URL}/api/media/paperless-court/judge/${this.case_id}/${document_type}/${document_name}`;
    this.doc_id = doc_id;
    this.pdfViewer.pdfSrc = this.url;
    this.pdfViewer.refresh();
  }
  onUpdateOrderUrl(pdf: string){
    this.url = `https://hcs.gov.in/hcs/hg_orders/${pdf}`;
    this.pdfViewer.pdfSrc = this.url;
    this.pdfViewer.refresh();
  }
  onRouteCauseList(){
    this.routeCauseList.emit({status: true});
  }
}
