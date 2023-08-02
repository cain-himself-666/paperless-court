import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';

@Component({
  selector: 'app-ack',
  templateUrl: './ack.component.html',
  styleUrls: ['./ack.component.css']
})
export class AckComponent {
  @Input() application_id?: string = '';
  @Output() routeForm = new EventEmitter<Apply>();

  onRouteForm(){
    this.routeForm.emit({status: true});
  }
}
