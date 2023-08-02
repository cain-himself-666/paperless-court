import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule, Routes } from '@angular/router';
import { CaseEntryComponent } from './case-entry.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', redirectTo: '/paperless-court/cases-entry/view', pathMatch: 'full'},
  { path: '', component: CaseEntryComponent,
    children: [
      { path: 'view', component: ViewComponent },
      { path: 'add', component: AddComponent },
      { path: 'upload/:id', component: UploadComponent },
    ]
  }
]
@NgModule({
  declarations: [
    CaseEntryComponent,
    ViewComponent,
    AddComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule
  ]
})
export class CasesEntryModule { }
