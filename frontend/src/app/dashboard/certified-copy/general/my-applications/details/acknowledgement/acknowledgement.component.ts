import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcknowledgementComponent {
  @Input() application_id?: string;
  @Output() routeBack = new EventEmitter<Apply>();
  onGoBack(){
    this.routeBack.emit({status: true});
  }
}
