import { Component, EventEmitter, Output } from '@angular/core';
import { ApplicationService } from '../../applications.service';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { MyApplication } from 'src/app/shared/interfaces/my-applications.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  dtOptions: DataTables.Settings = {}
  completed_application: Array<MyApplication> = [];
  @Output() routeDetails = new EventEmitter<Apply>();
  constructor(private applicationService: ApplicationService){}
  ngOnInit():void{
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers',
      processing: true,
    }
    this.getApplications();
  }
  getApplications(){
    this.applicationService.getApplications('Completed').subscribe({
      next: data => {
        this.completed_application = data;
      }
    })
  }
  onRouteDetails(application_id: string){
    this.routeDetails.emit({status: true, application_id: application_id});
  }
}
