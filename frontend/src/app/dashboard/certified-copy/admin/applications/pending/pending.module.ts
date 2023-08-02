import { NgModule } from "@angular/core";
import { ViewComponent } from "./view/view.component";
import { EditComponent } from "./edit/edit.component";
import { PendingComponent } from "./pending.component";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { QRCodeModule } from "angularx-qrcode";
@NgModule({
    declarations: [
        ViewComponent,
        EditComponent,
        PendingComponent
    ],
    imports: [
        DataTablesModule,
        CommonModule,
        FormsModule,
        QRCodeModule,
    ],
    exports: [
        PendingComponent,
    ]
})
export class PendingModule{

}