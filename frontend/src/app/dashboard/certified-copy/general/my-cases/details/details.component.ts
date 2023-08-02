import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { AllCaseDetails } from '../interfaces/all-case-details';
import { Advocates } from '../interfaces/advocates.interface';
import { Acts } from '../interfaces/acts.interface';
import { IA } from '../interfaces/ia.interface';
import { Order } from '../../apply/search/interfaces/order.interface';
import { Judgement } from '../../apply/search/interfaces/judgement.interface';
import { SearchService } from '../../apply/search/search.service';
import { MyCasesService } from '../my-cases.service';
import { NgForm } from '@angular/forms';
import { Notes } from '../interfaces/notes.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @ViewChild('closeBtn', { static: true } ) closeBtn!: ElementRef; 
  @Input() cnr?:string = '';
  all_case_details: Array<AllCaseDetails> = [];
  bench: Array<{judgename:string}> = [];
  petitioners: Array<Advocates> = [];
  respondents: Array<Advocates> = [];
  acts: Array<Acts> = [];
  ia: Array<IA> = [];
  orders: Array<Order> = [];
  judgments: Array<Judgement> = [];
  notes: Array<Notes> = [];
  constructor(private searchService: SearchService, private myCasesService: MyCasesService){}
  ngOnInit(): void{
    this.getCaseDetails();
    this.getNotes();
  }
  async getCaseDetails(){
    await this.getAllCaseDetails(this.cnr!);
    await this.getBench(this.cnr!);
    await this.getPetitioners(this.cnr!);
    await this.getRespondents(this.cnr!);
    await this.getActs(this.cnr!);
    await this.getIA(this.cnr!);
    await this.getOrders(this.cnr!);
    await this.getJudgements(this.cnr!);
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
  onAddNotes(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('note', data.value.note);
      fd.append('cnr', this.cnr!);
      this.myCasesService.add_note(fd).subscribe({
        next: data => {
          this.closeBtn.nativeElement.click();
          this.getNotes();
        },
      })
    }
  }
  getNotes(){
    this.myCasesService.get_notes(this.cnr!).subscribe({
      next: data => {
        this.notes = data;
      }
    })
  }
  deleteNote(note_id: number){
    let fd = new FormData();
    fd.append('id', note_id.toString());
    this.myCasesService.delete_note(fd).subscribe({
      next: data => {
        this.getNotes();
      }
    })
  }
}
