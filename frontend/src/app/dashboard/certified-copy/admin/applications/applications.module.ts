import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.componet';
import { RouterModule } from '@angular/router';
import { PendingModule } from './pending/pending.module';
import { CompletedModule } from './completed/completed.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ApplicationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ApplicationsComponent}]),
    PendingModule,
    CompletedModule,
  ]
})
export class ApplicationsModule { }
