import { Component } from '@angular/core';
import { CauseListService } from './causelist.service';
import { CasesEntryService } from '../cases-entry/cases-entry.service';

@Component({
    selector: 'app-causelist',
    templateUrl: './causelist.component.html',
})
export class Causelistcomponent{
    cases: any;
  sno: string = '';
  cno: string = '';
  name: string = '';
  date: string = '';
  showSuccess: boolean = false;
  constructor(private causeListService: CauseListService, private caseEntryService: CasesEntryService){}
  ngOnInit(){
    this.caseEntryService.get_cases().subscribe({
      next: data => {
        this.cases = data
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onCreateCauseList(data:any){
    let fd = new FormData();
    fd.append('case_id', data.value.cno);
    fd.append('sno', data.value.sno);
    fd.append('name', data.value.name);
    fd.append('date', data.value.date);
    this.causeListService.create_cause_list(fd).subscribe({
      next: data => {
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false
        },1500);
      },
      error: err => {
        console.log(err);
        this.showSuccess = false;
      }
    })
  }
}