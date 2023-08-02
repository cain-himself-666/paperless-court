import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { ApplyService } from '../apply.service';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() routeAck = new EventEmitter<Apply>();
  applicant_details: any;
  document: any;
  bpl_card: any;
  deadline_date: any;
  showBplUpload: boolean = false;
  classicEditor = ClassicEditor;
  constructor(private localStorageService: LocalStorageService, private applyService: ApplyService){
      this.applicant_details = this.localStorageService.getDetails();
  }
  ngOnInit():void{
    let date = new Date();
    this.deadline_date = new Date(date.setDate(date.getDate() + 30));
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else if(!this.document && data.value.details === ''){
      alert('Please write details or upload an application');
    }
    else{
      let fd = new FormData();
      let date = new Date();
      fd.append('applicant_name', this.applicant_details.related_profile.name);
      fd.append('from_department', 'null');
      fd.append('contact_number', this.applicant_details.username)
      fd.append('mailing_address', data.value.address);
      fd.append('content', data.value.details);
      fd.append('is_sensory_disabled', data.value.sensorily_disabled);
      fd.append('is_concern_of_life_liberty', data.value.life_and_liberty);
      fd.append('status', 'applied');
      fd.append('is_online_application', 'True');
      fd.append('is_received', 'False');
      fd.append('applied_on', `${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0' : '1'}${date.getMonth()}-${date.getDate() < 10 ? '0':''}${date.getDate()}`);
      fd.append('deadline_on', `${this.deadline_date.getFullYear()}-${this.deadline_date.getMonth()+1 < 10 ? '0' : '1'}${this.deadline_date.getMonth()+1}-${this.deadline_date.getDate() < 10 ? '0':''}${this.deadline_date.getDate()}`);
      if(this.document){
        fd.append('document_url', this.document);
      }
      if(this.bpl_card && this.showBplUpload){
        fd.append('economic_category_proof_url', this.bpl_card);
      }
      this.showBplUpload ? fd.append('economic_category', 'bpl') : fd.append('economic_category', 'apl');
      this.applyService.apply(fd).subscribe({
        next: data => {
          this.routeAck.emit({status: true, application_id: data.application_no})
        }
      })
    }
  }
  onGetFile(event:any){
    if(event.target.files){
      this.document = event.target.files[0];
    }
  }
  onGetBPLCard(event: any){
    if(event.target.files){
      this.bpl_card = event.target.files[0];
    }
  }
  isBPL(key:string){
    this.showBplUpload = key === 'yes' ? true : false;
  }
  is_life_and_liberty(status: boolean){
    let date = new Date();
    this.deadline_date = status ? new Date(date.setDate(date.getDate() + 2)) : new Date(date.setDate(date.getDate() + 30));
  }
}
