import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ack',
  templateUrl: './ack.component.html',
  styleUrls: ['./ack.component.css']
})
export class AckComponent {
  @Input() application_id?: string = '';
}
