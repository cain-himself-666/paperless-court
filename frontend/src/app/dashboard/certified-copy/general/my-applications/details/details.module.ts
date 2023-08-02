import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { DetailsComponent } from './details.component';
import { FormsModule } from '@angular/forms';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';

@NgModule({
  declarations: [
    DetailsComponent,
    ViewDetailsComponent,
    AcknowledgementComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    DetailsComponent
  ]
})
export class DetailsModule { }
