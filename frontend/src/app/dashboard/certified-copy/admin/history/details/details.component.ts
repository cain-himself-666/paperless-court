import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { MyApplicationService } from '../../../general/my-applications/my-applications.service';
import { FetchedOJ } from 'src/app/shared/interfaces/fetched-oj.interface';
import { ApplicationCaseDetails } from 'src/app/shared/interfaces/case-details.interface';
import { ProfileDetails } from 'src/app/shared/interfaces/profile-details.interface';
import { Print } from 'src/app/shared/methods/print';
import { URL } from 'src/environment/environment';
import { GetUrl } from 'src/app/shared/methods/get-doc-url';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() application_id?:string = '';
  @Output() routeView = new EventEmitter<Apply>();
  appUrl:string = URL;
  remarks: string = '';
  isAdvocate: boolean = false;
  url: string = '';
  orders: Array<FetchedOJ> = [];
  judgements: Array<FetchedOJ> = [];
  case_details: ApplicationCaseDetails = {};
  profile_details!: ProfileDetails;
  role:any;
  get_url = new GetUrl(this.myApplicationService);
  print = new Print();
  constructor(private myApplicationService: MyApplicationService){}
  ngOnInit(): void{
    this.getApplicationDetails();
  }
  onRouteView(){
    this.routeView.emit({status: true});
  }
  getUrl(date:string, cnr:string, number:any){
    this.get_url.getURL(date, cnr, number).then((d:any) => window.open(d, '_blank'));
  }
  getApplicationDetails(){
    this.myApplicationService.get_application_details(this.application_id!).subscribe({
        next: async data => {
          this.orders = await data.orders;
          this.judgements = await data.judgements;
          this.case_details = await data.case_details;
          if(data.profile_details){
            this.profile_details = await data.profile_details;
          }
        }
    })
  }
  async getURL(date: string, cnr: string, order_no:any){
    this.url = await '';
    if(order_no === 0){
      await this.myApplicationService.getJudFileName(date, cnr).subscribe(data => {
        this.url = `https://hcs.gov.in/hcs/hg_orders/${data[0].filename}`;
      })
    }
    else{
      await this.myApplicationService.getOrdFileName(date, cnr).subscribe(data => {
        this.url = `https://hcs.gov.in/hcs/hg_orders/${data[0].orderpdf}`;
      })
    }
    setTimeout(() => {
      window.open(this.url, '_blank');
    }, 300);
  }
  printReceipt(){
    this.print.generatePendingReceipt(this.application_id!,this.case_details, this.orders,this.judgements,this.profile_details);
  }
}
