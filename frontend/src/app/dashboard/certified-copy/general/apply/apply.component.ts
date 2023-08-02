import { Component, ViewEncapsulation } from "@angular/core";
import { slideComp } from "src/app/shared/animation/component-animations";
import { Apply } from "src/app/shared/interfaces/event-status.interface";
import { CaseDetails } from "./search/interfaces/case-detail.interface";

@Component({
    selector: 'app-apply',
    template: `
                <div class="text-center">
                    <h2>Apply for Orders and Judgement Copy</h2>
                </div>
                <div class="mt-4">
                    <div [hidden]="!showSearch">
                        <app-search (routePayment)="onShowPayment($event)"></app-search>
                    </div>
                    <div *ngIf="showPayment">
                        <app-payment (routeSearch)="onShowSearch($event)" (routeAck)="onShowAck($event)" [selectedArr]="selected" [details]="details" [pages]="pages" [application_id]="application_id"></app-payment>
                    </div>
                    <div *ngIf="showAck">
                        <app-acknowledgement [application_id]="application_id"></app-acknowledgement>
                    </div>
                </div>
    `,
    styles: [`
        .header{
            font-weight: bold;
        }
    `],
    animations: [
        slideComp
    ],
    encapsulation: ViewEncapsulation.None,
})
export class ApplyComponent{
    showSearch: boolean = true;
    showPayment: boolean = false;
    showAck: boolean = false;
    selected?: Array<any> = []
    details?: CaseDetails;
    pages?:number = 0;
    application_id?:string = '';

    onShowSearch(data: Apply){
        this.showSearch = data.status;
        this.showPayment = !data.status;
        this.showAck = !data.status;
    }
    onShowPayment(data: Apply){
        this.showSearch = !data.status;
        this.showPayment = data.status;
        this.showAck = !data.status;
        this.selected = data.selected;
        this.details = data.details;
        this.pages = data.pages;
        this.application_id = data.application_id;
    }
    onShowAck(data: Apply){
        this.showSearch = !data.status;
        this.showPayment = !data.status;
        this.showAck = data.status;
        this.application_id = data.application_id;
    }
}