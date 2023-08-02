import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { OtpComponent } from './otp/otp.component';
import { RouterModule } from '@angular/router';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { FormsModule } from '@angular/forms';
import { DetailsModule } from './details/details.module';



@NgModule({
  declarations: [
    RegistrationComponent,
    OtpComponent,
    AcknowledgementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: RegistrationComponent}]),
    FormsModule,
    DetailsModule,
  ]
})
export class RegistrationModule { }
