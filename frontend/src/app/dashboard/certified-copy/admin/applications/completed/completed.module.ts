import { NgModule } from "@angular/core";
import { ViewComponent } from "./view/view.component";
import { EditComponent } from "./edit/edit.component";
import { CompletedComponent } from "./complete.component";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ViewComponent,
        EditComponent,
        CompletedComponent,
    ],
    imports: [
        DataTablesModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        CompletedComponent
    ]
})
export class CompletedModule{

}