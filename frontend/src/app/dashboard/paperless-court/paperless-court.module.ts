import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperlessCourtRoutingModule } from './paperless-court-routing.module';
import { PaperlessCourtComponent } from './paperless-court.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaperlessCourtComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PaperlessCourtRoutingModule,
    FormsModule,
  ]
})
export class PaperlessCourtModule { }
