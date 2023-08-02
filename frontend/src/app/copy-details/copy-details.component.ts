import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CopyDetailsService } from './copy-details.service';
import { CopyDetails } from './copy-details.interface';

@Component({
  selector: 'app-copy-details',
  templateUrl: './copy-details.component.html',
  styleUrls: ['./copy-details.component.css']
})
export class CopyDetailsComponent {
  application_id: string = '';
  details!: CopyDetails;
  constructor(private route: ActivatedRoute, private copyDetailsService: CopyDetailsService){}
  ngOnInit(): void{
    this.route.queryParams.subscribe({
      next: (data: Params) => {
        this.application_id = data['id'];
      }
    })
    this.getDetails();
  }
  getDetails(){
    this.copyDetailsService.view(this.application_id).subscribe({
      next: data => {
        this.details = data[0];
      }
    })
  }
}
