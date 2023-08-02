import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    HistoryComponent,
    ViewComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: HistoryComponent } ] ),
    DataTablesModule,
  ]
})
export class HistoryModule { }
