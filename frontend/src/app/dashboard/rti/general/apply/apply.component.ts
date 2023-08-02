import { Component } from "@angular/core";
import { slideComp } from "src/app/shared/animation/component-animations";
import { Apply } from "src/app/shared/interfaces/event-status.interface";

@Component({
    selector: 'app-apply',
    template: ` 
                <div class="text-center">
                    <h4>Apply for RTI</h4>
                </div>
                <div *ngIf="showForm" [@componentAnimation]>
                    <app-form (routeAck)="onShowAck($event)"></app-form>
                </div>
                <div *ngIf="showAck" [@componentAnimation]>
                    <app-ack [application_id]="application_id"></app-ack>
                </div>
            `,
    animations: [
        slideComp
    ]
})
export class ApplyComponent{
    showForm: boolean = true;
    showAck: boolean = false;
    application_id?: string = '';
    onShowAck(data: Apply){
        this.showForm = !data.status;
        this.showAck = data.status;
        this.application_id = data.application_id;
    }
}