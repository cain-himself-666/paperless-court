import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../../apply/search/search.service';
import { CaseType } from '../../apply/search/interfaces/case-type.interface';
import { NgForm } from '@angular/forms';
import { MyCasesService } from '../my-cases.service';
import { AllCaseDetails } from '../interfaces/all-case-details';
import { Advocates } from '../interfaces/advocates.interface';
import { Acts } from '../interfaces/acts.interface';
import { IA } from '../interfaces/ia.interface';
import { Order } from '../../apply/search/interfaces/order.interface';
import { Judgement } from '../../apply/search/interfaces/judgement.interface';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  selected_case_type: string = '';
  selected_case_year: string = '2012';
  case_types: Array<CaseType> = [];
  years: Array<String> = [];
  showLoader: boolean = false;
  all_case_details: Array<AllCaseDetails> = [];
  bench: Array<{judgename:string}> = [];
  petitioners: Array<Advocates> = [];
  respondents: Array<Advocates> = [];
  acts: Array<Acts> = [];
  ia: Array<IA> = [];
  orders: Array<Order> = [];
  judgments: Array<Judgement> = [];
  showSuccess:boolean = false;
  showError: string = '';
  @Output() routeView = new EventEmitter<Apply>();
  constructor(private searchService: SearchService, private myCasesService: MyCasesService){}
  ngOnInit(): void{
    let date = new Date();
    let shortYear = date.getFullYear().toString().substring(2);
    for(var i=12;i<=parseInt(shortYear);i++){
      this.years.push(`20${i}`);
    }
    this.getCaseTypes();
  }
  getCaseTypes(){
    this.searchService.get_case_types().subscribe({
      next: data => {
        this.case_types = data;
      }
    })
  }
  async getCaseDetails(data: NgForm){
    if(!data.valid){
      await data.control.markAllAsTouched();
    }
    else{
      this.showLoader = true;
      this.searchService.get_case_details(data.value.case_type, data.value.case_no, data.value.case_year).subscribe({
        next: async data => {
            if(data[0]){
              this.showError = await 'false';
              await this.getAllCaseDetails(data[0].filing_no);
              await this.getBench(data[0].filing_no);
              await this.getPetitioners(data[0].filing_no);
              await this.getRespondents(data[0].filing_no);
              await this.getActs(data[0].filing_no);
              await this.getIA(data[0].filing_no);
              await this.getOrders(data[0].filing_no);
              await this.getJudgements(data[0].filing_no);
              this.showLoader = await false;
            }
            else{
              this.showLoader = false;
              this.showError = 'true';
            }
        },
      })
    }
  }
  getAllCaseDetails(cnr:string){
    this.all_case_details = [];
    this.myCasesService.get_all_case_details(cnr).subscribe({
      next: data => {
        this.all_case_details = data;
      }
    })
  }
  getBench(cnr:string){
    this.bench = [];
    this.myCasesService.get_bench(cnr).subscribe({
      next: data => {
        this.bench = data;
      }
    })
  }
  getPetitioners(cnr:string){
    this.petitioners = [];
    this.myCasesService.get_petitioners(cnr).subscribe({
      next: data => {
        this.petitioners = data;
      }
    })
  }
  getRespondents(cnr:string){
    this.respondents = [];
    this.myCasesService.get_respondents(cnr).subscribe({
      next: data => {
        this.respondents = data;
      }
    })
  }
  getActs(cnr:string){
    this.acts = [];
    this.myCasesService.get_acts(cnr).subscribe({
      next: data => {
        this.acts = data;
      }
    })
  }
  getIA(cnr:string){
    this.ia = [];
    this.myCasesService.get_ia(cnr).subscribe({
      next: data => {
        this.ia = data;
      }
    })
  }
  getOrders(cnr:string){          
    this.orders = [];
    this.searchService.get_orders(cnr).subscribe({
      next: data => {
        this.orders = data;
      }
    })
  }
  getJudgements(cnr:string){
    this.judgments = [];
    this.searchService.get_judgements(cnr).subscribe({
      next: data => {
        this.judgments = data;
      }
    })
  }
  onRouteView(){
    this.routeView.emit({status: true});
  }
  addCase(){
    let fd = new FormData();
    fd.append('cnr', this.all_case_details[0].cino);
    fd.append('case_number', this.all_case_details[0].case_no);
    this.myCasesService.add_cases(fd).subscribe({
      next: data => {
        this.showSuccess = true;
      }
    })
  }
}