import { Component, EventEmitter, Input, Output} from '@angular/core';
import { AdvocateDetails } from '../adv-details.interface';
import { Registration } from '../registration.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() contact?: string = '';
  @Input() user_type?: string = '';
  @Input() details?: AdvocateDetails;
  @Output() success = new EventEmitter<Registration>();

  onShowSuccess(data: Registration){
    this.success.emit({status:data.status, ackMessage: data.ackMessage});
  }
}
