import { Component, EventEmitter, Output } from '@angular/core';
import { Registration } from '../registration.interface';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  timer!: number;
  otpField: boolean = false;
  contact: string = '';
  user_type: string = '';
  showError:string = '';
  @Output() details = new EventEmitter<Registration>();
  @Output() failedAck = new EventEmitter<Registration>();
  constructor(private registrationService: RegistrationService){}
  onRouteDetailsPage(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showError = '';
      this.registrationService.verify_otp(this.contact, data.value.otp, this.user_type).subscribe({
        next: data => {
          this.details.emit({status: true, contact: this.contact, user_type: this.user_type, details: data});
        },
        error: err => {
          if(err.error === 'User already exists'){
            this.failedAck.emit({status: true, ackMessage: 'userexist'})
          }
          if(err.error === 'NotRegistered'){
            this.failedAck.emit({status: true, ackMessage: 'nocis'})
          }
          if(err.error === 'Incorrect OTP'){
            this.showError = err.error;
          }
        }
      })
    }
  }
  sendOtp(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.otpField = true;
      this.timer = 30;
      this.contact = data.value.contact;
      this.user_type = data.value.user;
      let fd = new FormData();
      fd.append('contact', this.contact);
      this.registrationService.get_otp(fd).subscribe({
        next: data => {
          var startTimer = setInterval(() => {
            this.timer--;
            if(this.timer === 0){
              clearInterval(startTimer);
            }
          }, 1000)
        }
      })
    }
  }
}
