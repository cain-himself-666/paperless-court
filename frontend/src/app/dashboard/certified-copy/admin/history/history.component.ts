import { Component } from "@angular/core";
import { Apply } from "src/app/shared/interfaces/event-status.interface";

@Component({
    selector: 'app-history',
    template: `
        <div class="text-center mb-4">
            <h2>History</h2>
        </div>
        <div class="mt-3">
            <h4>Application(s)</h4>
            <hr>
            <div *ngIf="showView">
                <app-view (routeDetails)="onShowDetails($event)"></app-view>
            </div>
            <div *ngIf="showDetails">
                <app-details (routeView)="onShowView($event)" [application_id]="application_id"></app-details>
            </div>
        </div>
    `,
})
export class HistoryComponent{
    showView:boolean = true;
    showDetails: boolean = false;
    application_id?:string = '';
    onShowDetails(data: Apply){
        this.showView = !data.status;
        this.showDetails = data.status;
        this.application_id = data.application_id;
    }
    onShowView(data:Apply){
        this.showView = data.status;
        this.showDetails = !data.status;
    }
}