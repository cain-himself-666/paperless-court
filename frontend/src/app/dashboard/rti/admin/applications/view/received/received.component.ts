import { Component } from '@angular/core';
import { ApplicationService } from '../../applications.service';
import { MyApplicationServices } from 'src/app/dashboard/rti/general/my-applications/my-applications.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent {
  applications: Array<any> = [];
  application_no: string = '';
  address: string = '';
  content: string = '';
  document_url:string = '';
  economic_category: string = '';
  economic_category_proof: string = '';
  life_and_liberty: boolean = false;
  sensorily_disabled: boolean = false;
  constructor(private applicationsService: ApplicationService, private myApplicationService: MyApplicationServices){}
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
    this.applicationsService.get_applications('received').subscribe({
      next: data => {
        this.applications = data.results;
      }
    })
  }
  getDetails(id:number){
    this.myApplicationService.get_application_details(id).subscribe({
      next: data => {
        this.application_no = data.application_no;
        this.address = data.mailing_address;
        this.content = data.content;
        this.document_url = data.document_url;
        this.economic_category = data.economic_category;
        this.economic_category_proof = data.economic_category_proof_url;
        this.sensorily_disabled = data.is_sensory_disabled;
        this.life_and_liberty = data.is_concern_of_life_liberty;
      },
    })
  }
}
