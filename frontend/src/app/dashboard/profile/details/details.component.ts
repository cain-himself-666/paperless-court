import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { ProfileService } from '../profile.service';
import { URL } from 'src/environment/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  isAdmin: boolean = false;
  isAdvocate: boolean = false;
  editMode: boolean = false;
  role:any;
  url:string = URL;
  id_proof: any;
  id_card: any;
  showSuccess: any = null;
  constructor(private localStorageService: LocalStorageService, private profileService: ProfileService) {}
  ngOnInit(): void{
    this.role = this.localStorageService.getDetails();
    this.isAdmin = this.role.related_group[0].id === 2 ? true : false;
    this.isAdvocate = this.role.related_group[0].id === 3 ? true : false;
  }
  onEnableEditMode(){
    this.editMode = true;
  }
  onUpdateProfile(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let id_card_name: string = this.id_card ? `${this.role.username}.${this.id_card.type.split('/')[1]}` : this.role.related_profile.bar_certificate;
      let id_proof_name: string = this.id_proof ? `${this.role.username}.${this.id_proof.type.split('/')[1]}` : this.role.related_profile.id_proof;
      let fd = new FormData();
      fd.append("name", data.value.name);
      fd.append("email", data.value.email);
      fd.append("gender", data.value.gender);
      fd.append("id_card_name", id_card_name);
      fd.append("id_proof_name", id_proof_name);
      if(this.id_proof){
        fd.append('id_proof', this.id_proof);
      }
      if(this.id_card){
        fd.append('id_card', this.id_card);
      }
      this.profileService.update_profile(fd).subscribe({
        next: data => {
          this.showSuccess = 'Profile Updated Successfully !! Changes will be affected in next login';
          setTimeout(() => {
            this.showSuccess = null;
          }, 3500)
        }
      })
    }
  }
  onUploadIdProof(event:any){
    if(event.target.files){
      this.id_proof = event.target.files[0];
    }
  }
  onUploadIdCard(event:any){
    if(event.target.files){
      this.id_card = event.target.files[0];
    }
  }
}
