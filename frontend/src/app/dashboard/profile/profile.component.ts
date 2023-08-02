import { Component } from '@angular/core';
import { slideComp } from 'src/app/shared/animation/component-animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    slideComp
  ]
})
export class ProfileComponent {
  toggleView: boolean = false;
  toggleStatus: string = 'details';
  onToggle(status: string){
    this.toggleStatus = status;
    this.toggleView = this.toggleStatus === 'details' ? false : true;
  }
}
