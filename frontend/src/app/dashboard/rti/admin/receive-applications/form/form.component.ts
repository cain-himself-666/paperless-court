import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReceiveApplicationService } from '../receive-application.service';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ ReceiveApplicationService ],
})
export class FormComponent {
  @Output() routeAck = new EventEmitter<Apply>();
  role: number = 0;
  applicant_details: any;
  document: any;
  bpl_card: any;
  showBplUpload: boolean = false;
  applied_date: any;
  deadline_date: any;
  life_and_liberty: boolean = false;
  receiveApplicationService = inject(ReceiveApplicationService);
  classicEditor = ClassicEditor;
  receiveRTI(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else if(!this.document && data.value.details === ''){
      alert('Please write details or upload an application');
    }
    else{
      let fd = new FormData();
      fd.append('applicant_name', data.value.name);
      fd.append('contact_number', data.value.contact);
      fd.append('from_department', data.value.department);
      fd.append('mailing_address', data.value.address);
      fd.append('applied_on', data.value.applied_date);
      fd.append('received_on', data.value.received_date);
      fd.append('content', data.value.details);
      fd.append('is_sensory_disabled', data.value.sensorily_disabled);
      fd.append('is_concern_of_life_liberty', data.value.life_and_liberty);
      fd.append('is_received', 'True');
      fd.append('is_online_application', 'False');
      fd.append('status', 'received');
      fd.append('deadline_on', `${this.deadline_date.getFullYear()}-${this.deadline_date.getMonth()+1 < 10 ? '0':''}${this.deadline_date.getMonth()+1}-${this.deadline_date.getDate() < 10 ? '0':''}${this.deadline_date.getDate()}`);
      if(this.document){
        fd.append('document_url', this.document);
      }
      if(this.bpl_card && this.showBplUpload){
        fd.append('economic_category_proof_url', this.bpl_card);
      }
      this.showBplUpload ? fd.append('economic_category', 'bpl') : fd.append('economic_category', 'apl');
      this.receiveApplicationService.receive_rti(fd).subscribe({
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
  onGetDeadline(event:any){
    this.applied_date = new Date(event.target.value);
    this.setDeadlineDate();
  }
  is_life_and_liberty(status: boolean){
    this.life_and_liberty = status;
    this.setDeadlineDate();
  }
  async setDeadlineDate(){
    var fetchedDate = new Date(this.applied_date);
    this.deadline_date = await this.life_and_liberty ? new Date(fetchedDate.setDate(fetchedDate.getDate() + 2)) : new Date(fetchedDate.setDate(fetchedDate.getDate() + 30));
  }
}
