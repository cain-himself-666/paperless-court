import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  showView:boolean = true;
  showAck: boolean = false;
  application_id?: string = '';
  key?: string = '';
  forwarded_to?: string = '';
  constructor(private route: ActivatedRoute){}
  id:number = 0;
  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.id = param['id'];
      }
    })
  }
  onShowAck(data: Apply){
    this.showAck = data.status;
    this.showView = !data.status;
    this.application_id = data.application_id;
    this.key = data.key;
    this.forwarded_to = data.forwarded_to;
  }
  onShowView(data: Apply){
    this.showAck = !data.status;
    this.showView = data.status;
  }
}
