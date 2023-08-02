import { Component } from '@angular/core';
import { ApplicationService } from '../../applications.service';
@Component({
  selector: 'app-applied',
  templateUrl: './applied.component.html',
  styleUrls: ['./applied.component.css']
})
export class AppliedComponent {
  applications: Array<any> = [];
  constructor(private applicationsService: ApplicationService){}
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void{
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers',
      processing: true,
    }
    this.getApplications();
  }
  getApplications(){
    this.applicationsService.get_applications('applied').subscribe({
      next: data => {
        this.applications = data.results;
      }
    })
  }
}
