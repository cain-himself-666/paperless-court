import { Component } from '@angular/core';
import { MyApplicationServices } from './my-applications.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent {
  myApplications: any = [];
  application_no: string = '';
  address: string = '';
  content: string = '';
  document_url:string = '';
  economic_category: string = '';
  economic_category_proof: string = '';
  life_and_liberty: boolean = false;
  sensorily_disabled: boolean = false;
  constructor(private myApplicationService: MyApplicationServices){}
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
    this.myApplicationService.get_applications().subscribe({
      next: data => {
        this.myApplications = data;
      }
    })
  }
  getDetails(id:number){
    this.myApplicationService.get_application_details(id).subscribe({
      next: data => {
        console.log(data);
        this.sensorily_disabled = data.is_sensory_disabled;
        this.life_and_liberty = data.is_concern_of_life_liberty;
        this.application_no = data.application_no;
        this.address = data.mailing_address;
        this.content = data.content;
        this.document_url = data.document_url;
        this.economic_category = data.economic_category;
        this.economic_category_proof = data.economic_category_proof_url;
      },
    })
  }
}
