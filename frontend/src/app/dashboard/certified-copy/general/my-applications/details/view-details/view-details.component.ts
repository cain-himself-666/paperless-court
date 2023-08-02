import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MyApplicationService } from '../../my-applications.service';
import { ApplicationCaseDetails } from 'src/app/shared/interfaces/case-details.interface';
import { ProfileDetails } from 'src/app/shared/interfaces/profile-details.interface';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { CostCalculator } from 'src/app/shared/methods/cost-calculator';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { PaymentsService } from '../../../apply/payment/payment.service';
import { NgForm } from '@angular/forms';
import { FetchedOJ } from 'src/app/shared/interfaces/fetched-oj.interface';
import { GetUrl } from 'src/app/shared/methods/get-doc-url';
import { URL } from 'src/environment/environment';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent {
  @ViewChild('closeBtn', { static: true } ) closeBtn!: ElementRef;
  @ViewChild('closeBtn2', { static: true } ) closeBtn2!: ElementRef;
  @Input() application_id?:string = '';
  @Output() routeView = new EventEmitter<Apply>();
  @Output() routeAck = new EventEmitter<Apply>();
  role:any;
  appUrl:string = URL;
  orders: Array<FetchedOJ> = [];
  judgements: Array<FetchedOJ> = [];
  case_details: ApplicationCaseDetails = {};
  profile_details!: ProfileDetails;
  modal_key:boolean = false;
  remarks: any;
  oj:boolean = false;
  mode:string = 'Email';
  physicalCost: number = 0;
  onlineCost: number = 0;
  totalCost: number = 0;
  totalPage: number = 0;
  user_type:string = 'pip';
  copy: number = 1;
  reason:string = '';
  btnLoader: boolean= false;
  copies: Array<number> = [1,2,3,4,5,6,7,8,9,10];
  is_accused: boolean = false;
  check_is_accused: boolean = false;
  showIsAccused: boolean = true;
  isAccusedOption: boolean = false;
  isAdvocate: boolean = false;
  criminal_cases:Array<string> = ['Appeal(Crl.)','BAIL APPLN.', 'Cont.Cas (Crl)', 'Crl. A.', 'CRL.L.P','Crl. M. C.','CRL. REV. P','Tr. P. (Crl.)','WP (Crl.)'];
  costCalculator = new CostCalculator();
  get_url = new GetUrl(this.myApplicationService);
  constructor(private myApplicationService: MyApplicationService, private localStorageService: LocalStorageService, private paymentService: PaymentsService){}
  ngOnInit(): void{
    this.role = this.localStorageService.getDetails();
    this.isAdvocate = this.role.related_group[0].id === 3 ? true : false;
    this.getApplicationDetails();
    this.paymentMaster();
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
          await this.calculatePages(this.orders, this.judgements);
        }
    })
    setTimeout(() => {
      this.isAccusedOption = this.criminal_cases.some(i => i === this.case_details.case_number?.split('/')[0]);
      this.getRemarks();
    }, 500)
  }
  getRemarks(){
    if(this.profile_details.remarks){
      this.remarks = this.profile_details.remarks.split('|');
    }  
  }
  calculatePages(orders:any, judgements: any){
    this.totalPage = 0;
    if(orders[0]){
      orders.forEach((d:any) => {
        this.totalPage += d.pages;
      })
    }
    if(judgements[0]){
      judgements.forEach((d:any) => {
        this.totalPage += d.pages;
      })
    } 
  }
  getTotalCost(){
    this.totalCost = this.costCalculator.calculateCost(this.copy, this.totalPage, this.mode, this.is_accused, this.physicalCost, this.onlineCost);
    return this.totalCost;
  }
  async onSelectCopies(event: any){
    this.copy = await event.target.value;
    await this.getTotalCost();
  }
  onToggelModal2(key:string){
   this.oj =  key === 'oj' ? true : false;
  }
  async onSelectMode(key: string){
    this.mode = await key;
    await this.getTotalCost();
  }
  async isAccused(event: any){
    this.is_accused = await event.target.checked ? true : false;
    await this.getTotalCost();
  }
  async selectUserType(key:string){
    this.user_type = await key;
    this.showIsAccused = key === 'pip' ? true : false;
    this.is_accused = false;
    this.check_is_accused = false;
  }
  paymentMaster(){
    this.paymentService.payment_master().subscribe({
      next: data => {
        this.physicalCost = data.offline_mode;
        this.onlineCost = data.online_mode;
      }
    })
  }
  getUrl(date:string, cnr:string, number:any){
    this.get_url.getURL(date, cnr, number).then((d:any) => window.open(d, '_blank'));
  }
  onDiscardDraft(){
    let fd = new FormData();
    fd.append('application_id',this.application_id!);
    this.myApplicationService.deleteDraftApplication(fd).subscribe({
      next: data => {
        this.closeBtn.nativeElement.click();
        this.routeView.emit({status: true});
      }
    })
  }
  onToggleModal(key:string){
    this.modal_key = key === 'discard' ? false : true;
  }
  onAddRemarks(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('application_id', this.application_id!);
      fd.append('remarks', data.value.rem);
      this.myApplicationService.updateApplications(fd).subscribe({
        next: data => {
          this.closeBtn2.nativeElement.click();
          this.getApplicationDetails();
        }
      })
      data.reset();
    }
  }
  onSubmit(){
    let fd = new FormData();
    if(!this.showIsAccused && this.reason === ''){
      alert('Please add a reason to continue');
    }
    else{
      fd.append('user_type', this.isAdvocate ? '' : this.user_type);
      fd.append('application_id', this.application_id!.toString());
      fd.append('mode_of_payment', this.mode);
      fd.append('calculated_amount', this.totalCost.toString());
      fd.append('number_of_copies', this.copy.toString());
      fd.append('reason', this.showIsAccused ? '' : this.reason);
      fd.append('form', 'Insert');
      fd.append('is_accused', this.is_accused ? 'True' : 'False');
      fd.append('pages', this.totalPage.toString());
      this.paymentService.submitApplication(fd).subscribe({
        next: data => {
          this.closeBtn.nativeElement.click();
          this.routeAck.emit({status: true, application_id: this.application_id});
        }
      })
    }
  }
}