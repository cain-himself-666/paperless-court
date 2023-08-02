import { Component } from "@angular/core";
import { Apply } from "src/app/shared/interfaces/event-status.interface";

@Component({
    selector: 'app-selector',
    templateUrl: './my-applications.component.html',
})
export class MyApplicationsComponent{
    showAppView: boolean = true;
    showDetailsView:boolean = false;
    application_id?: string = '';
    onShowAppView(data: Apply){
        this.showAppView = data.status;
        this.showDetailsView = !data.status;
    }
    onShowDetailsView(data: Apply){
        this.showAppView = !data.status;
        this.showDetailsView = data.status;
        this.application_id = data.application_id;
    }
}