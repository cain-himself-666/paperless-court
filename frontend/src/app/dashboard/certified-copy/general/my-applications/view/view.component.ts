import { Component, EventEmitter, Output } from '@angular/core';
import { MyApplication } from 'src/app/shared/interfaces/my-applications.interface';
import { MyApplicationService } from '../my-applications.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
    @Output() routeDetails = new EventEmitter<Apply>();
    dtOptions: DataTables.Settings = {};
    data: Array<MyApplication> = [];
    my_details: any;
    constructor(private myApplicationService: MyApplicationService, private localStorageService: LocalStorageService){
        this.my_details = this.localStorageService.getDetails();
    }
    ngOnInit():void{
        this.dtOptions = {
            pageLength: 10,
            pagingType: 'full_numbers',
            processing: true
        }
        this.getMyApplications();
    }
    getMyApplications(){
        this.myApplicationService.get_my_applications().subscribe({
            next: data => {
                this.data = data;
            }
        })
    }
    getApplicationDetails(application_id:string){
        this.routeDetails.emit({status: true, application_id: application_id});
    }
}
