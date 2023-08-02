import { Component } from '@angular/core';
import { ApplicationService } from '../../applications.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { MyApplicationServices } from 'src/app/dashboard/rti/general/my-applications/my-applications.service';
@Component({
  selector: 'app-forwarded',
  templateUrl: './forwarded.component.html',
  styleUrls: ['./forwarded.component.css']
})
export class ForwardedComponent {
  applications: Array<any> = [];
  role: number = 0;
  application_no: string = '';
  address: string = '';
  content: string = '';
  document_url:string = '';
  economic_category: string = '';
  economic_category_proof: string = '';
  constructor(private applicationsService: ApplicationService, private localStorageService: LocalStorageService, private myApplicationService: MyApplicationServices){
    this.role = this.localStorageService.getDetails().related_group[0].id;
  }
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
    this.applicationsService.get_applications('forwarded').subscribe({
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
      },
    })
  }
}
