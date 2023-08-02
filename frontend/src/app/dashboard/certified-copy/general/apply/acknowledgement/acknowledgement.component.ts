import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcknowledgementComponent {
  @Input() application_id?: string;
}
