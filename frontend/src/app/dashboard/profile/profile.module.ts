import { NgModule } from "@angular/core";
import { DetailsComponent } from "./details/details.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileComponent } from "./profile.component";
import { CommonModule } from "@angular/common";
import { Route, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
const route: Route[] = [
    { path: '', component: ProfileComponent}
]
@NgModule({
    declarations: [
        ProfileComponent,
        DetailsComponent,
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        FormsModule
    ],
})
export class ProfileModule{}