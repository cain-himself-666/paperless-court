import { Component, EventEmitter, Output } from '@angular/core';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { ApplicationService } from '../../applications.service';
import { MyApplication } from 'src/app/shared/interfaces/my-applications.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  @Output() routeDetails = new EventEmitter<Apply>();
  dtOptions: DataTables.Settings = {};
  pending_applications: Array<MyApplication> = [];
  constructor(private applicationService: ApplicationService){}
  ngOnInit():void{
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers',
      processing: true,
    }
    this.getApplications();
  }
  onRouteDetails(application_id: string){
    this.routeDetails.emit({status: true, application_id: application_id});
  }
  getApplications(){
    this.applicationService.getApplications('Pending').subscribe({
      next: data => {
        this.pending_applications = data;
      }
    })
  }
}
