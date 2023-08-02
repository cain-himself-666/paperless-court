import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CasesEntryService } from '../cases-entry.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  heading = 'Add Details';
  @Output('displayUploadDocs') uploadDocs: any = new EventEmitter<{status: boolean, id: string}>;
  additional_petitioner:any = [];
  additional_respondent:any = [];
  petitioner_counsels:any = [];
  respondent_counsels:any = [];
  p_counsel:string = '';
  r_counsel:string = '';
  addn_pet: string = '';
  addn_res: string = '';
  showError: boolean = false;
  constructor (private caseEntryService: CasesEntryService, private router: Router) {} 
  addAdditionalPetitioner(){
    this.addn_pet === '' ?  alert('Please enter additional petitioner'): this.additional_petitioner.push(this.addn_pet);
  }
  addAdditionalRespondent(){
    this.addn_res === '' ?  alert('Please enter additional respondent'): this.additional_respondent.push(this.addn_res);
  }
  addPetitionerCounsels(){
    this.p_counsel === '' ?  alert('Please enter counsel name') : this.petitioner_counsels.push(this.p_counsel);
  }
  addRespondentCounsels(){
    this.r_counsel === '' ?  alert('Please enter counsel name') : this.respondent_counsels.push(this.r_counsel);
  }
  deleteAdditionalPetitioner(entry: string){
    this.additional_petitioner.splice(this.additional_petitioner.findIndex((item: string) => item === entry),1);
  }
  deleteAdditionalRespondent(entry: string){
    this.additional_respondent.splice(this.additional_respondent.findIndex((item: string) => item === entry),1);
  }
  deletePetitionerCounsels(entry: string){
    this.petitioner_counsels.splice(this.petitioner_counsels.findIndex((item: string) => item === entry),1);
  }
  deleteRespondentCounsels(entry: string){
    this.respondent_counsels.splice(this.respondent_counsels.findIndex((item: string) => item === entry),1);
  }
  onCaseEntry(data: any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let petitioner_counsels:string = this.delimitedString(this.petitioner_counsels, '|'),
          respondent_counsels:string = this.delimitedString(this.respondent_counsels, '|'),
          additional_petitioners: string = this.delimitedString(this.additional_petitioner, '|'),
          additional_respondents: string = this.delimitedString(this.additional_respondent, '|');
      let fd = new FormData();
      fd.append('case_no', data.value.case_no);
      fd.append('cnr', data.value.cnr);
      fd.append('first_petitioner', data.value.petitioner_name);
      fd.append('first_respondent', data.value.respondent_name);
      fd.append('petitioner_counsels', petitioner_counsels);
      fd.append('respondent_counsels', respondent_counsels);
      fd.append('additional_petitioners', additional_petitioners || '');
      fd.append('additional_respondents', additional_respondents || '');
      this.caseEntryService.case_entry(fd).subscribe({
        next: data => {
          this.router.navigate(['/paperless-court/cases-entry/upload', data.case_id]);
        },
        error: err => {
          this.showError = true;
        }
      })
    }
  }
  delimitedString(array: any, delimiter:string){
    let a = '';
    array.forEach((data:any) => {
      a += data+delimiter
    })
    a = a.substring(0, a.length-1);
    return a;
  }
}
