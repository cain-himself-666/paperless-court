import { Component } from "@angular/core";
import { slideComp } from "src/app/shared/animation/component-animations";
import { Apply } from "src/app/shared/interfaces/event-status.interface";

@Component({
    selector: 'app-receive-applications',
    template: `
        <div class="text-center">
            <h2>Receive Applications</h2>
        </div>
        <div *ngIf="showForm" [@componentAnimation]>
            <app-form (routeAck)="onShowAck($event)"></app-form>
        </div>
        <div *ngIf="showAck" [@componentAnimation]>
            <app-ack (routeForm)="onShowForm($event)" [application_id]="application_id"></app-ack>
        </div>
    `,
    animations: [
        slideComp
    ]
})

export class ReceiveApplicationsComponent{
    showForm: boolean = true;
    showAck: boolean = false;
    application_id?: string = '';
    onShowAck(data: Apply){
        this.showForm = !data.status;
        this.showAck = data.status;
        this.application_id = data.application_id;
    }
    onShowForm(data: Apply){
        this.showForm = data.status;
        this.showAck = !data.status;
    }
}