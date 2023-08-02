import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyApplicationsRoutingModule } from './my-applications-routing.module';
import { MyApplicationsComponent } from './my-applications.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    MyApplicationsComponent
  ],
  imports: [
    CommonModule,
    MyApplicationsRoutingModule,
    DataTablesModule
  ]
})
export class MyApplicationsModule { }
