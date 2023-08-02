import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { CaseDetails } from '../search/interfaces/case-detail.interface';
import { CostCalculator } from '../../../../../shared/methods/cost-calculator';
import { PaymentsService } from './payment.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent {
  @Output() routeSearch = new EventEmitter<Apply>();
  @Output() routeAck = new EventEmitter<Apply>();
  @Input() selectedArr?: Array<{order_date:string, order_number:string, bench:string, filename:string, pages:any}> = []
  @Input() details?: CaseDetails;
  @Input() pages?: number = 0;
  @Input() application_id?: string = '';
  physicalCost: number = 0;
  onlineCost: number = 0;
  mode:string = 'Email';
  totalCost:number = 0;
  user_type:string = 'pip';
  copy: number = 1;
  reason:string = '';
  is_accused: boolean = false;
  copies: Array<number> = [1,2,3,4,5,6,7,8,9,10];
  criminal_cases:Array<string> = ['Appeal(Crl.)','BAIL APPLN.', 'Cont.Cas (Crl)', 'Crl. A.', 'CRL.L.P','Crl. M. C.','CRL. REV. P','Tr. P. (Crl.)','WP (Crl.)'];
  check_is_accused: boolean = false;
  showIsAccused: boolean = true;
  isAccusedOption: boolean = false;
  isAdvocate: boolean = false;
  orders: Array<{order_date:string, order_number:string, bench:string, filename:string, pages:any}> = [];
  judgements: Array<{judgement_date:string, bench: string, filename:string, pages: any}> = [];
  costCalculator = new CostCalculator();
  constructor(private paymentService: PaymentsService, private cdr: ChangeDetectorRef, private localStorageService: LocalStorageService){}
  ngOnInit(){
    let role = this.localStorageService.getDetails();
    this.isAdvocate = role.related_group[0].id === 3 ? true : false;
    this.isAccusedOption = this.criminal_cases.some(i => i === this.details?.finalcaseno.split('/')[0]);
    this.selectedArr?.forEach(d => {
      if(d.order_number === '0'){
        this.judgements.push({
          judgement_date: d.order_date,
          bench: d.bench,
          filename: d.filename,
          pages: d.pages
        })
      }
      else{
        this.orders.push({
          order_date: d.order_date,
          order_number: d.order_number,
          bench: d.bench,
          filename: d.filename,
          pages: d.pages,
        })
      }
    })
  }
  ngAfterViewInit(){
    this.paymentMaster();
  }
  onGoBack(){
    this.routeSearch.emit({status: true});
  }
  getTotalCost(){
    this.totalCost = this.costCalculator.calculateCost(this.copy, this.pages, this.mode, this.is_accused, this.physicalCost, this.onlineCost);
    return this.totalCost;
  }
  async onSelectCopies(event: any){
    this.copy = await event.target.value;
    await this.getTotalCost();
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
        this.cdr.detectChanges();
      }
    })
  }
  onRouteAckPage(){
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
      fd.append('pages', this.pages!.toString());
      this.paymentService.submitApplication(fd).subscribe({
        next: data => {
          this.routeAck.emit({status: true, application_id: this.application_id});
        }
      })
    }
  }
}