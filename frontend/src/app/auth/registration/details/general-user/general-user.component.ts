import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Registration } from '../../registration.interface';
import { RegistrationService } from '../../registration.service';

@Component({
  selector: 'app-general-user',
  templateUrl: './general-user.component.html',
  styleUrls: ['./general-user.component.css']
})
export class GeneralUserComponent {
  @Output() success = new EventEmitter<Registration>();
  @Input() contact?: string = '';
  selected_gender: string = '';
  id_proof: any;
  photo: any;
  constructor(private registrationService: RegistrationService){}
  onRouteAckPage(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      const contact:any = this.contact;
      var id_proof_name = `${this.contact}.${this.id_proof.type.split('/')[1]}`;
      fd.append('name', data.value.name);
      fd.append('email', data.value.email);
      fd.append('contact_number', contact);
      fd.append('gender', data.value.gender);
      fd.append('address', '');
      fd.append('photo', '');
      fd.append('id_proof', id_proof_name);
      fd.append('id_file', this.id_proof);
      fd.append('advId', '');
      fd.append('password', data.value.pswd);
      fd.append('brn', '');
      fd.append('user_type', '4');
      this.registrationService.register_user(fd).subscribe({
        next: data => {
          this.success.emit({status: true, ackMessage: 'success'});
        }
      })
    }
  }
  onGetPhoto(event:any){
    if(event.target.files){
      this.photo = event.target.files[0];
    }
  }
  onGetIdProof(event:any){
    if(event.target.files){
      this.id_proof = event.target.files[0];
    }
  }
}
