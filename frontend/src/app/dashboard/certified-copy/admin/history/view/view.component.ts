import { Component, EventEmitter, Output } from "@angular/core";
import { MyApplication } from "src/app/shared/interfaces/my-applications.interface";
import { HistoryService } from "../history.service";
import { Apply } from "src/app/shared/interfaces/event-status.interface";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
    @Output() routeDetails = new EventEmitter<Apply>();
    dtOptions: DataTables.Settings = {};
    data: Array<MyApplication> = [];
    constructor(private historyService: HistoryService){}
    ngOnInit():void{
        this.dtOptions = {
            pageLength: 10,
            pagingType: 'full_numbers',
            processing: true
        }
        this.getApplications();
    }
    getApplications(){
        this.historyService.getHistory().subscribe({
            next: data => {
                this.data = data;
            }
        })
    }
    onRouteDetails(application_id:string){
      this.routeDetails.emit({status: true, application_id: application_id});
    }
}
