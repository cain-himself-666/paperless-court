import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { AckComponent } from './ack/ack.component';
import { ReceiveApplicationsComponent } from './receive-applications.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  declarations: [
    ReceiveApplicationsComponent,
    FormComponent,
    AckComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forChild([{ path: '', component: ReceiveApplicationsComponent }]),
  ]
})
export class ReceiveApplicationsModule { }
