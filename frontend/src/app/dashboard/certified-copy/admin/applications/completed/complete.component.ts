import { Component } from "@angular/core";
import { Apply } from "src/app/shared/interfaces/event-status.interface";

@Component({
    selector: 'app-completed',
    template: `
        <div *ngIf="showPendingView">
            <app-view (routeDetails)="onShowPendingDetails($event)"></app-view>
        </div>
        <div *ngIf="showPendingDetails">
            <app-edit (routeView)="onShowPendingView($event)" [application_id]="application_id"></app-edit>
        </div> 
    `,
})
export class CompletedComponent{
    application_id?:string = '';
    showPendingView: boolean = true;
    showPendingDetails: boolean = false;

    onShowPendingView(data: Apply){
        this.showPendingView = data.status;
        this.showPendingDetails = !data.status;
    }
    onShowPendingDetails(data: Apply){
        this.showPendingDetails = data.status;
        this.showPendingView = !data.status;
        this.application_id = data.application_id;
    }
}