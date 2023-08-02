import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdvocateDetails } from '../../adv-details.interface';
import { Advocate } from './advocate.model';
import { RegistrationService } from '../../registration.service';
import { Registration } from '../../registration.interface';

@Component({
  selector: 'app-advocate',
  templateUrl: './advocate.component.html',
  styleUrls: ['./advocate.component.css']
})
export class AdvocateComponent {
  @Input() contact?: string = '';
  @Input() details?:AdvocateDetails | any;
  @Output() success = new EventEmitter<Registration>();
  selected_gender: string = '';
  advDetails!:Advocate;
  advocate_id: any;
  constructor(private registrationService: RegistrationService){}
  ngOnInit(): void{
    this.advDetails = new Advocate(this.details.name, this.details.email, this.details.address, this.details.brn, this.details.gender)
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      const contact:any = this.contact;
      var id_name = `${this.contact}.${this.advocate_id.type.split('/')[1]}`;
      fd.append('name', data.value.name);
      fd.append('email', data.value.email);
      fd.append('contact_number', contact);
      fd.append('gender', data.value.gender);
      fd.append('address', '');
      fd.append('adv_id', this.advocate_id);
      fd.append('photo', '');
      fd.append('id_proof', '');
      fd.append('advId', id_name);
      fd.append('password', data.value.pswd);
      fd.append('brn', data.value.brn);
      fd.append('user_type', '3');
      this.registrationService.register_user(fd).subscribe({
        next: data => {
          this.success.emit({status: true, ackMessage: 'success'});
        }
      })
    }
  }
  onGetIdCard(event:any){
    if(event.target.files){
      this.advocate_id = event.target.files[0];
    }
  }
}
