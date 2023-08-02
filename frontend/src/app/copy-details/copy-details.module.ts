import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyDetailsComponent } from './copy-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CopyDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CopyDetailsComponent}]),
  ]
})
export class CopyDetailsModule { }
