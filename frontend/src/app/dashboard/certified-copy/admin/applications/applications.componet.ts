import { Component } from "@angular/core";
import { slideComp } from "src/app/shared/animation/component-animations";

@Component({
    selector: 'app-applications',
    template: `
                <div class="title text-center">
                    <h2>Applications</h2>
                </div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" [ngClass]="{ 'active': !toggleValue, '': toggleValue }" (click)="onToggleValue(true)">Pending</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" [ngClass]="{ 'active': toggleValue, '': !toggleValue }" (click)="onToggleValue(false)">Completed</a>
                    </li>
                </ul>
                <div [@componentAnimation] *ngIf="!this.toggleValue">
                    <app-pending></app-pending>
                </div>
                <div [@componentAnimation] *ngIf="this.toggleValue">
                    <app-completed></app-completed>
                </div>
    `,
    styles: [`
        li{
            cursor: pointer;
        }
        .nav-link{
            color: #499ad9;
        }
    `],
    animations: [ slideComp ],
})
export class ApplicationsComponent{
    toggleValue: boolean = false;

    onToggleValue(status: boolean){
        this.toggleValue = status ? false : true;
    }
}