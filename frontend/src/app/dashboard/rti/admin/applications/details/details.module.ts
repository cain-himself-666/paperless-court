import { NgModule } from "@angular/core";
import { ViewComponent } from "./view/view.component";
import { AckComponent } from "./ack/ack.component";
import { DetailsComponent } from "./details.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        DetailsComponent,
        ViewComponent,
        AckComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: DetailsComponent }]),
    ]
})

export class DetailsModule{}