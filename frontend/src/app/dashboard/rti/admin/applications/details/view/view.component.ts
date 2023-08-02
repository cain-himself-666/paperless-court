import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationService } from '../../applications.service';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  @ViewChild('closeBtn', { static: true }) private closeBtn!: ElementRef;
  @Input() id: number = 0;
  @Output() routeAck = new EventEmitter<Apply>();
  departments: Array<{id?:number, name?: string}> = [];
  details: any;
  organisations: Array<any> = [];
  modal_key: string = '';
  showOthers: boolean = false;
  district: { id: number, name: string } = { id: 0, name: ''};
  role: number = 0;
  constructor(private localStorageService: LocalStorageService, private applicationService: ApplicationService){
    this.role = this.localStorageService.getDetails().related_group[0].id;
  }
  ngOnInit(): void{
    this.applicationService.get_application(this.id).subscribe({
      next: data => {
        this.details = data;
      }
    })
  }
  addDepartments(data: { key:string, name?: string}){
    if(data.key === 'others'){
      this.departments.push({name: data.name});
    }
    else{
      this.departments.push({id: this.district.id, name: this.district.name});
    }
  }
  deleteDepartment(name?: string){
    let index = this.departments.findIndex(d => d.name === name);
    if(index >= 0){
      this.departments.splice(index, 1);
    }
  }
  receiveApplication(){
    let fd = new FormData();
    let date = new Date();
    fd.append('id', this.id.toString());
    fd.append('status', 'received');
    fd.append('is_received', 'True');
    fd.append('received_on', `${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0':''}${date.getMonth()+1}-${date.getDate() < 10 ? '0':''}${date.getDate()}`);
    this.applicationService.update_application(fd).subscribe({
      next: data => {
        this.routeAck.emit({ status: true, application_id: this.details.application_no, key: 'received'});
        this.closeBtn.nativeElement.click();
      }
    })
  }
  forwardApplication(department: string){
    let fd = new FormData();
    let date = new Date();
    fd.append('application', this.id.toString());
    fd.append('forwarded_on', `${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0':''}${date.getMonth()+1}-${date.getDate() < 10 ? '0':''}${date.getDate()}`);
    if(!this.showOthers){
      fd.append('forwarded_to', this.district.id.toString());
      fd.append('forwarded_to_address', this.district.name);
    }
    else{
      fd.append('forwarded_to_address', department);
    }
    this.applicationService.forward_application(fd).subscribe({
      next: data => {
        let fd = new FormData();
        fd.append('id', this.id.toString());
        fd.append('status', 'forwarded');
        this.applicationService.update_application(fd).subscribe();
        this.routeAck.emit({ status: true, application_id: this.details.application_no, key: 'forwarded', forwarded_to: this.showOthers ? department : this.district.name});
        this.closeBtn.nativeElement.click();
      }
    })
  }
  triggerModal(key: string){
    this.modal_key = key;
    if(key === 'forward'){
      this.applicationService.get_organizations().subscribe({
        next: data => {
          this.organisations = data.results;
        }
      })
    }
  }
  toggle(key:string){
    this.departments = [];
    this.showOthers = key === 'others' ? true : false;
  }
  onSubmission(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.modal_key === 'forward' ? this.forwardApplication(data.value.department) : this.receiveApplication();
    }
  }
  onSelectDistrict(event: any){
    this.district = {
      id: event.target.value,
      name: event.target.options[event.target.selectedIndex].text,
    }
  }
}
