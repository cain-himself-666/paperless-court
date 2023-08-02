import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentsService } from 'src/app/dashboard/certified-copy/general/apply/payment/payment.service';
import { MyApplicationService } from 'src/app/dashboard/certified-copy/general/my-applications/my-applications.service';
import { ApplicationCaseDetails } from 'src/app/shared/interfaces/case-details.interface';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { FetchedOJ } from 'src/app/shared/interfaces/fetched-oj.interface';
import { ProfileDetails } from 'src/app/shared/interfaces/profile-details.interface';
import { GetUrl } from 'src/app/shared/methods/get-doc-url';
import { Print } from 'src/app/shared/methods/print';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { URL } from 'src/environment/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('closeBtn', { static: true } ) closeBtn!: ElementRef;
  @Input() application_id?: string = '';
  @Output() routeView = new EventEmitter<Apply>();
  remarks: string = '';
  appUrl: string = URL;
  isAdvocate: boolean = false;
  url: string = '';
  orders: Array<FetchedOJ> = [];
  judgements: Array<FetchedOJ> = [];
  case_details: ApplicationCaseDetails = {};
  profile_details!: ProfileDetails;
  role:any;
  print = new Print();
  get_url = new GetUrl(this.myApplicationService);
  collect_mode: boolean = false;
  constructor(private myApplicationService: MyApplicationService, private localStorageService: LocalStorageService, private paymentService: PaymentsService){}
  ngOnInit(): void{
    this.getApplicationDetails();
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
  async getURL(date: string, cnr: string, order_no:any,key: string){
    this.get_url.getURL(date,cnr,order_no).then((d:any) => {
      if(key === 'view'){
        window.open(d, '_blank')
      }
    })
  }
  onRouteView(){
    this.routeView.emit({status: true});
  }
  printReceipt(){
    this.print.generateCompletedReceipt('print', this.application_id!, this.case_details, this.orders,this.judgements,this.profile_details)
  }
  onToggleMode(key:string){
    this.collect_mode = key === 'collect' ? true : false;
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('paid_amount', data.value.paid_amount || '0');
      fd.append('status', 'Collected');
      fd.append('application_id', this.application_id!);
      this.myApplicationService.updateApplications(fd).subscribe({
        next: data => {
          this.closeBtn.nativeElement.click();
          this.onRouteView();
        }
      })
    }
  }
}
