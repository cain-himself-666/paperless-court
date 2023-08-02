import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router){}
  onSelectDate(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.router.navigate(['/paperless-court/cases'], { queryParams: { date: data.value.date }});
      data.reset();
    }
  }
}
