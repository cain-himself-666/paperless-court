import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  showError:any = null;
  constructor(private profileService: ProfileService){}
  changePassword(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append("current_password", data.value.current_password);
      fd.append("new_password", data.value.new_password);
      this.profileService.update_password(fd).subscribe({
        next: data => {
          this.showError = 'updated';
        },
        error: err => {
          this.showError = 'invalid';
        }
      })
    }
  }
}
