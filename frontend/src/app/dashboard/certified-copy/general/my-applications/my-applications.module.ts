import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyApplicationsComponent } from './my-applications.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ViewComponent } from './view/view.component';
import { DetailsModule } from './details/details.module';

@NgModule({
  declarations: [
    MyApplicationsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( [ { path: '', component: MyApplicationsComponent } ] ),
    DataTablesModule,
    DetailsModule
  ]
})
export class MyApplicationsModule { }
