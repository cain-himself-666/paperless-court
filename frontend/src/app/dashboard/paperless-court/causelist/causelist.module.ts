import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Causelistcomponent } from './causelist.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Causelistcomponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: Causelistcomponent }]),
    FormsModule
  ]
})
export class CauselistModule { }
