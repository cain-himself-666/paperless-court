import { NgModule } from '@angular/core';
import { MyCasesComponent } from './my-cases.component';
import { RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [
    MyCasesComponent,
    ViewComponent,
    AddComponent,
    DetailsComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: MyCasesComponent}]),
    DataTablesModule
  ]
})
export class MyCasesModule { }
