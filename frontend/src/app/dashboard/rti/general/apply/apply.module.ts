import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplyComponent } from './apply.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { AckComponent } from './ack/ack.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    ApplyComponent,
    FormComponent,
    AckComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild( [ { path: '', component: ApplyComponent } ] ),
    CKEditorModule,
  ]
})
export class ApplyModule { }
