import { Component } from '@angular/core';
import { LogService } from './logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  dtOptions: DataTables.Settings = {};
  logs: Array<any> = [];
  constructor(private logService: LogService){}
  ngOnInit(): void{
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers',
      processing: true,
    }
    this.getLogs();
  }
  getLogs(){
    this.logService.get_logs().subscribe({
      next: data => {
        this.logs = data;
      }
    })
  }
}
