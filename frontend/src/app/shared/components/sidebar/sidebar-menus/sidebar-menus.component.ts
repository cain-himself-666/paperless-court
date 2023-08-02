import { Component,Input, Renderer2 } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-sidebar-menus',
  templateUrl: './sidebar-menus.component.html',
  styleUrls: ['./sidebar-menus.component.css']
})
export class SidebarMenusComponent {
  subMenuToggle: boolean = false;
  role:any;
  @Input() toggleValue: boolean = false;
  constructor(private renderer: Renderer2, private localStorageService: LocalStorageService){}
  ngOnInit():void{
    this.role = this.localStorageService.getDetails();
  }
  onToggle(elem1:any, elem2: any){
    this.subMenuToggle = !this.subMenuToggle
    if(this.subMenuToggle){
      this.renderer.addClass(elem1, 'open');
      this.renderer.addClass(elem2, 'active');
    }
    else{
      this.renderer.removeClass(elem1, 'open');
      this.renderer.removeClass(elem2, 'active');
    }
  }
  
}
