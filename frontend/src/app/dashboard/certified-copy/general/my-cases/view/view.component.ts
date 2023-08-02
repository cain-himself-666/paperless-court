import { Component, EventEmitter, Output } from '@angular/core';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { MyCasesService } from '../my-cases.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  dtOptions: DataTables.Settings = {};
  my_cases: Array<{case_number:string, cnr:string}> = [];
  @Output() routeAdd = new EventEmitter<Apply>();
  @Output() routeDetails = new EventEmitter<Apply>();
  constructor(private myCasesService: MyCasesService){}
  ngOnInit(): void{
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers',
      processing: true,
    }
    this.getMyCases();
  }
  onRouteAdd(){
    this.routeAdd.emit({status: true});
  }
  getMyCases(){
    this.myCasesService.get_my_cases().subscribe({
      next: data => {
        this.my_cases = data;
      }
    })
  }
  deleteCase(cnr:string){
    let fd = new FormData();
    fd.append('cnr', cnr);
    this.myCasesService.delete_cases(fd).subscribe({
      next: data => {
        this.getMyCases();
      }
    })
  }
  onRouteDetails(cnr:string){
    this.routeDetails.emit({status: true, cnr: cnr})
  }
}
