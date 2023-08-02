import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Apply } from "src/app/shared/interfaces/event-status.interface";

@Component({
    selector: 'app-details',
    template: `
        <section class="mt-3">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <i class="bi bi-arrow-left-circle" style="font-size: 24px; cursor: pointer" (click)="routeView({status: true})"></i>
                    <h5>Application ID: {{ application_id }}</h5>
                    <span>&nbsp;</span>
                </div>
                <div class="card-body">
                    <div *ngIf="showViewDetails">
                        <app-view-details [application_id]="application_id" (routeView)="routeView($event)" (routeAck)="onShowAck($event)"></app-view-details>
                    </div>
                    <div *ngIf="showAck" class="mb-5">
                        <app-acknowledgement (routeBack)="routeView($event)" [application_id]="application_id"></app-acknowledgement>
                    </div>
                </div> 
            </div>
        </section>
    `
})
export class DetailsComponent{
    @Input() application_id?:string = '';
    @Output() routeAppView = new EventEmitter<Apply>();
    showViewDetails: boolean = true;
    showAck: boolean = false;
    onShowAck(data: Apply){
        this.showViewDetails = !data.status;
        this.showAck = data.status;
    }
    routeView(data: Apply){
        this.routeAppView.emit({status: data.status});
    }
}