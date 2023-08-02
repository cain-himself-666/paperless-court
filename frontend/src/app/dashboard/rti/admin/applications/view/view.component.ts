import { Component } from '@angular/core';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  role:number = 0;
  showApplied: boolean = true;
  showReceived: boolean = false;
  showForwarded: boolean = false;
  constructor(private localStorageService: LocalStorageService){
    this.role = this.localStorageService.getDetails().related_group[0].id;
  }
  ngOnInit():void{
    this.role === 5 ? this.showForwarded = true : this.showApplied = true;
  }
  onShowApplied(data: Apply){
    this.showApplied = data.status;
    this.showReceived = !data.status;
    this.showForwarded = !data.status;
  }
  onShowReceived(data: Apply){
    this.showApplied = !data.status;
    this.showReceived = data.status;
    this.showForwarded = !data.status;
  }
  onShowForwarded(data: Apply){
    this.showApplied = !data.status;
    this.showReceived = !data.status;
    this.showForwarded = data.status;
  }
}
