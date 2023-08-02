import { Component } from '@angular/core';
import { CasesEntryService } from '../cases-entry.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  dtOptions: DataTables.Settings = {};
  cases: Array<any> = [];
  constructor(private caseEntryService: CasesEntryService){}
  ngOnInit(): void{
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers',
      processing: true,
    }
    this.getEnteredCases();
  }
  getEnteredCases(){
    this.caseEntryService.get_entered_cases().subscribe({
      next: data => {
        this.cases = data;
      }
    })
  }
}