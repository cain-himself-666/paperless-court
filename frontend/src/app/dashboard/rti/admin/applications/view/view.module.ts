import { NgModule } from "@angular/core";
import { ViewComponent } from "./view.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { RouterModule } from "@angular/router";
import { AppliedComponent } from './applied/applied.component';
import { ReceivedComponent } from './received/received.component';
import { ForwardedComponent } from './forwarded/forwarded.component';

@NgModule({
    declarations: [
        ViewComponent,
        AppliedComponent,
        ReceivedComponent,
        ForwardedComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DataTablesModule,
        RouterModule.forChild([{ path: '', component: ViewComponent }]),
    ]
})
export class ViewModule{}