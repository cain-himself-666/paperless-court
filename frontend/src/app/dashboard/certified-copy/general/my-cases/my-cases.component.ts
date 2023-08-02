import { Component, ViewEncapsulation } from "@angular/core";
import { Apply } from "src/app/shared/interfaces/event-status.interface";

@Component({
    selector: 'app-my-cases',
    template: `
        <div class="text-center">
            <h2>My Cases</h2>
        </div>
        <div class="mt-5">
            <div *ngIf="showView">
                <app-view (routeAdd)="onShowAdd($event)" (routeDetails)="onShowDetails($event)" ></app-view>
            </div>
            <div *ngIf="showAdd">
                <app-add (routeView)="onShowView($event)"></app-add>
            </div>
            <div *ngIf="showDetails">
                <app-details [cnr]="cnr"></app-details>
            </div>
        </div>
    `,
    styles: [`
        i{
            cursor: pointer;
            font-size: 1.5rem;
        }
    `],
    encapsulation: ViewEncapsulation.None,
})
export class MyCasesComponent{
    showView: boolean = true;
    showAdd: boolean = false;
    showDetails: boolean = false;
    cnr?:string = '';
    onShowView(data: Apply){
        this.showView = data.status;
        this.showAdd = !data.status;
        this.showDetails = !data.status;
    }
    onShowAdd(data: Apply){
        this.showView = !data.status;
        this.showAdd = data.status;
        this.showDetails = !data.status;
    }
    onShowDetails(data: Apply){
        this.showView = !data.status;
        this.showAdd = !data.status;
        this.showDetails = data.status;
        this.cnr = data.cnr;
    }
}