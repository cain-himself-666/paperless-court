import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  count: number = 0
  url_type: string = '';
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void{
    this.url_type = window.location.href.split('/')[5];
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('username', data.value.contact);
      fd.append('password', data.value.password);
      fd.append('client', 'api');
      this.authService.login(fd).subscribe({
        next: data => {
          switch(this.url_type){
            case 'c':
              window.location.href = '/dashboard/certified-copy';
              break;
            case 'r':
              window.location.href = '/dashboard/rti';
              break;
            case 'p':
              window.location.href = '/paperless-court';
              break;
            default:
              break;
          }
        }
      })
    }
  }
}
