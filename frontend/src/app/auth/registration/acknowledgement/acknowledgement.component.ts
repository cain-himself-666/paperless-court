import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class AcknowledgementComponent {
  displayMessage:string = '';
  @Input('message') ackMessage?: string = '';
  ngOnInit(): void{
    switch(this.ackMessage){
      case 'success':
        this.displayMessage = 'Registration Successfull';
        break;
      case 'nocis':
        this.displayMessage = 'Advocate not registered with CIS Sikkim. Kindly contact the Computer Cell, High Court of Sikkim.';
        break;
      case 'userexist':
        this.displayMessage = 'User already exist';
        break;
      default:
        this.displayMessage = '';
        break;
    }
  }
}
