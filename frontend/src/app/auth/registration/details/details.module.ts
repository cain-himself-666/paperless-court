import { NgModule } from "@angular/core";
import { DetailsComponent } from "./details.component";
import { GeneralUserComponent } from "./general-user/general-user.component";
import { AdvocateComponent } from "./advocate/advocate.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DetailsComponent,
        GeneralUserComponent,
        AdvocateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        DetailsComponent,
        GeneralUserComponent,
        AdvocateComponent
    ]
})
export class DetailsModule{

}