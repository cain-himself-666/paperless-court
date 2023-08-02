import { Component, EventEmitter, Output } from '@angular/core';
import { CasesServices } from '../cases.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cause-list',
  templateUrl: './cause-list.component.html',
  styleUrls: ['./cause-list.component.css']
})
export class CauseListComponent {
  cases: Array<any> = [];
  date: string = '';
  today:string = '';
  @Output() routeCaseFiles = new EventEmitter<{status: boolean, cnr:string}>();
  constructor(private casesService: CasesServices, private route: ActivatedRoute){}
  ngOnInit(): void{
    this.route.queryParams.subscribe({
      next: (queryParams: Params) => {
        this.date = queryParams['date'];
      }
    })
    let date = new Date(this.date);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November','December'];
    this.today = `${date.getDate()} ${months[date.getMonth()].toUpperCase()} ${date.getFullYear()}`;
    this.casesService.get_cause_list(this.date).subscribe({
      next: data => {
        this.cases = data;
      }
    })
  }
  onRouteCaseFiles(cnr:string){
    this.routeCaseFiles.emit({status: true, cnr: cnr})
  }
  convertLine(string:string){
    return string.replaceAll('|','<br>');
  }
}
