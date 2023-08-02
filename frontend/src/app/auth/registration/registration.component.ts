import { Component } from '@angular/core';
import { Registration } from './registration.interface';
import { slideComp } from 'src/app/shared/animation/component-animations';
import { AdvocateDetails } from './adv-details.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [ slideComp ],
})
export class RegistrationComponent {
  showOtp: boolean = true;
  showDetails: boolean = false;
  showAck: boolean = false;
  contact?: string = '';
  user_type?: string = '';
  details?: AdvocateDetails;
  ackMessage?:string = '';
  showOtpPage(){

  }
  showDetailsPage(data: Registration){
    this.showOtp = !data.status;
    this.showDetails = data.status;
    this.showAck = !data.status;
    this.contact = data.contact;
    this.user_type = data.user_type;
    this.details = data.details;
  }
  showAckPage(data: Registration){
    this.showOtp = !data.status;
    this.showDetails = !data.status;
    this.showAck = data.status;
    this.ackMessage = data.ackMessage;
  }
}
