import { Component } from "@angular/core";

@Component({
    selector: 'app-cases',
    template: `
        <div *ngIf="showCauseList">
            <app-cause-list (routeCaseFiles)="onShowCaseFiles($event)"></app-cause-list>
        </div>
        <div *ngIf="showCaseFiles">
            <app-case-files (routeCauseList)="onShowCauseList($event)" [cnr]="cnr"></app-case-files>
        </div>
    `
})
export class CasesComponent{
    showCauseList: boolean = true;
    showCaseFiles: boolean = false;
    cnr: string = '';
    onShowCauseList(data: {status: boolean}){
        this.showCauseList = data.status;
        this.showCaseFiles = !data.status;
    }
    onShowCaseFiles(data: {status: boolean, cnr:string}){
        this.showCauseList = !data.status;
        this.showCaseFiles = data.status;
        this.cnr = data.cnr;
    }
    
}