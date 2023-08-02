import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slide } from '../shared/animation/router-animation';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    slide
  ]
})
export class DashboardComponent {
  onSidebarToggle: boolean = false;
  mobileActive: boolean = false;
  backgroundActive: boolean = false;
  constructor(private cdr: ChangeDetectorRef){}
  onToggle(status:boolean){
    this.onSidebarToggle = status;
  }
  onGetStatus(data: { mobileActive: boolean, backgroundActive: boolean}){
    this.mobileActive = data.mobileActive;
    this.backgroundActive = data.backgroundActive;
  }
  prepareOutlet(outlet: RouterOutlet){
    console.log(outlet.activatedRouteData['animation']);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  ngAfterContentChecked(){
    this.cdr.detectChanges();
  }
}
