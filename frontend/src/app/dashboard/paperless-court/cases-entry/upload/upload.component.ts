import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { CasesEntryService } from '../cases-entry.service';
import { URL } from 'src/environment/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  heading = 'Upload Documents';
  file:any;
  progressValue: number = 0;
  showDocs: boolean = false;
  showSuccess: boolean = false;
  docs: any = [];
  url: string = `${URL}`;
  doc_types: any = [];
  doc_id: number = 0;
  case_id: number = 0;
  indexes: Array<any> = [];
  constructor(private caseEntryService: CasesEntryService, private route: ActivatedRoute){}
  ngOnInit():void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.case_id = param['id'];
      }
    })
    this.onGetDocs();
    this.onGetDocTypes();
  }
  onUploadDoc(data: any){
    let fd = new FormData();
    fd.append('case_id', this.case_id.toString());
    fd.append('document', this.file);
    fd.append('display_name', data.value.display_name);
    fd.append('document_type', data.value.doc_type);
    this.caseEntryService.uploadDocs(fd).pipe(map(events => {
      switch(events.type){
        case HttpEventType.UploadProgress:
          this.progressValue = Math.round(events.loaded/events.total! * 100);
          break;
        case HttpEventType.Response:
          setTimeout(() => {
            this.progressValue = 0;
          },250)
      }
    })).subscribe({
      next: data => {
        this.onGetDocs();
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onSelectFile(event:any){
    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0];
    }
  }
  onGetDocs(){
    this.caseEntryService.get_docs(this.case_id.toString()).subscribe({
      next: data => {
        console.log(data);
        this.showDocs = data.docs[0] ? (this.showDocs = true, this.docs = data.docs) : false;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onGetDocTypes(){
    this.caseEntryService.get_doc_types().subscribe({
      next: data => {
        this.doc_types = data;
      }
    })
  }
  addIndexes(index_name: string, index_page: number){
    let fd = new FormData();
    fd.append('doc_id', this.doc_id.toString());
    fd.append('name', index_name);
    fd.append('page', index_page.toString());
    this.caseEntryService.add_indexes(fd).subscribe({
      next: data => {
        this.getDocId(this.doc_id);
      }
    })
  }
  getDocId(id:number){
    console.log(id);
    this.doc_id = id;
    this.caseEntryService.get_indexes(id).subscribe({
      next: data => {
        console.log(data);
        this.indexes = data;
      }
    })
  }
}
