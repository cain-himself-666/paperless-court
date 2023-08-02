import { Component,Input,EventEmitter, Output} from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() toggleValue: boolean = false;
  @Input() mobileActive:boolean = false;
  @Input() backgroundActive:boolean = false;
  @Output() sendToggleValue = new EventEmitter<boolean>();
  ngOnInit():void{
    this.mobileActive = window.innerWidth > 1136 ? false : true;
  }
  onToggle(){
    this.toggleValue = !this.toggleValue;
    this.sendToggleValue.emit(this.toggleValue);
  }
  getClass(el:any){
    let className: string = '';
    if(el.getAttribute('class').indexOf('bigscreen') > 0){
      className = this.toggleValue ? 'inactive' : '';
    }
    else{
      className = this.toggleValue ? 'mobile-active' : '';
    }
    return className
  }
  closeSidebar(){
    if(this.backgroundActive && (this.toggleValue || !this.toggleValue)){
      this.toggleValue = !this.toggleValue;
    }
  }
}
