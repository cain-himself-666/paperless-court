import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from './search.service';
import { NgForm } from '@angular/forms';
import { CaseType } from './interfaces/case-type.interface';
import { CaseDetails } from './interfaces/case-detail.interface';
import { slideComp } from 'src/app/shared/animation/component-animations';
import { Order } from './interfaces/order.interface';
import { Judgement } from './interfaces/judgement.interface';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import * as PDFJS from "pdfjs-dist";
import { PageCalculator } from 'src/app/shared/methods/page-calculator';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [ slideComp ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  showLoader: boolean = false;
  years: Array<string> = [];
  case_types: Array<CaseType> = [];
  orders: Array<Order> = [];
  judgements: Array<Judgement> = [];
  selected_case_type: string = '';
  selected_case_year: string = '2012';
  selected: Array<{order_date:string, order_number:string, bench:string, filename:string, pages: any}> = [];
  data: Array<{cnr_number: string, case_number: string, order_number: string, order_date: string, number_of_pages: number, parties: string}> = []
  details!:CaseDetails;
  showDetails: string = '';
  order_calculation: string = '';
  judgment_calculation: string = '';
  pageCalculator: any;
  totalPages: number = 0;
  application_id: string = 'HC2300001';
  @Output() routePayment = new EventEmitter<Apply>();
  constructor(private searchService: SearchService, private cdr: ChangeDetectorRef){}
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
        this.cdr.detectChanges();
      }
    })
  }
  getCaseDetails(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.pageCalculator = new PageCalculator();
      this.selected = [];
      this.data = [];
      this.showLoader = true;
      this.searchService.get_case_details(data.value.case_type, data.value.case_no, data.value.case_year).subscribe({
        next: async data => {
          if(data){
            this.showDetails = await 'true';
            this.details = await { filing_no: data[0].filing_no, finalcaseno: data[0].finalcaseno, pet_name: data[0].pet_name, res_name: data[0].res_name, status: data[0].status, regis_date: data[0].regis_date};
            await this.getOrders(this.details.filing_no);
            await this.getJudgements(this.details.filing_no);
          }
          else{
            this.showDetails = await 'false';
          }
          this.cdr.detectChanges();
        },
        complete: () => {this.showLoader = false;}
      })
    }
  }
  getOrders(cnr:string){
    this.orders = [];
    this.order_calculation = 'true';
    this.searchService.get_orders(cnr).subscribe({
      next: async data => {
        this.orders = await data;
        if(this.orders[0] && !this.orders[data.length-1].pages){
          this.order_calculation = 'true';
        }
        for(var i=0; i < this.orders.length; i++){
          PDFJS.GlobalWorkerOptions.workerSrc = await '../../assets/scripts/script.js';
          await PDFJS.getDocument(`https://hcs.gov.in/hcs/hg_orders/${this.orders[i].orderpdf}`).promise.then((pdf) => {
            this.orders[i].pages = pdf.numPages
          }).catch(err => console.log(err));
        }
        this.order_calculation = 'false';
        this.cdr.detectChanges();
      }
    })
  }
  getJudgements(cnr:string){
    this.judgements = [];
    this.judgment_calculation = 'true';
    this.searchService.get_judgements(cnr).subscribe({
      next: async data => {
        this.judgements = await data;
        if(this.judgements[0] && !this.judgements[data.length-1].pages){
          this.judgment_calculation = 'true';
        }
        for(var i=0; i < this.judgements.length; i++){
          PDFJS.GlobalWorkerOptions.workerSrc = '../../assets/scripts/script.js';
          await PDFJS.getDocument(`https://hcs.gov.in/hcs/hg_orders/${this.judgements[i].filename}`).promise.then((pdf) => {
            this.judgements[i].pages = pdf.numPages
          }).catch(err => console.log(err));
        }
        this.judgment_calculation = 'false';
        this.cdr.detectChanges();
      }
    })
  }
  onSelectEvent(event:any, date: string, number: string, bench: string, filename:string, pages:any){
    if(event.target.checked){
      this.selected.push({order_date: date, order_number: number, bench: bench, filename: filename, pages: pages});
      this.data.push({ cnr_number: this.details.filing_no, case_number: this.details.finalcaseno, order_number: number, order_date: date, number_of_pages: pages, parties: `${this.details.pet_name.trim()} vs ${this.details.res_name.trim()}`})
      this.totalPages = this.pageCalculator.countTotalPages(pages, 'add');
    }
    if(!event.target.checked){
      let index = this.selected.findIndex(i => i.order_date === date);
      this.selected.splice(index, 1);
      this.data.splice(index, 1);
      this.totalPages = this.pageCalculator.countTotalPages(pages, 'subtract')
    }
  }
  onRouteNextPage(){
    this.searchService.saveApplication(this.data.length, this.data).subscribe({
      next: data => {
        this.routePayment.emit({status: true, details: this.details, selected: this.selected, pages: this.totalPages, application_id: data.id});
      }
    })
  }
}