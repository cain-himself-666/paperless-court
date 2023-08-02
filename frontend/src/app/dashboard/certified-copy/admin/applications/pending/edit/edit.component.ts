import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { PDFDocument } from 'pdf-lib';
import { MyApplicationService } from 'src/app/dashboard/certified-copy/general/my-applications/my-applications.service';
import { ApplicationCaseDetails } from 'src/app/shared/interfaces/case-details.interface';
import { Apply } from 'src/app/shared/interfaces/event-status.interface';
import { FetchedOJ } from 'src/app/shared/interfaces/fetched-oj.interface';
import { ProfileDetails } from 'src/app/shared/interfaces/profile-details.interface';
import { GetUrl } from 'src/app/shared/methods/get-doc-url';
import { Print } from 'src/app/shared/methods/print';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { ALT_URL, URL } from 'src/environment/environment';
import { ApplicationService } from '../../applications.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('closeBtn', { static: true } ) closeBtn!: ElementRef;
  @Input() application_id?: string = '';
  @Output() routeView = new EventEmitter<Apply>();
  order_judgement:any;
  index:any;
  copy:any;
  appUrl: string = URL
  toggleCC:boolean = false;
  copies: any;
  copy_name:string = '';
  completed_receipt: any;
  value:any;
  btnLoader: boolean = false;
  remarks: string = '';
  isAdvocate: boolean = false;
  url: string = '';
  orders: Array<FetchedOJ> = [];
  judgements: Array<FetchedOJ> = [];
  case_details: ApplicationCaseDetails = {};
  profile_details!: ProfileDetails;
  modelKey: boolean = false;
  print = new Print();
  get_url = new GetUrl(this.myApplicationService);
  constructor(private myApplicationService: MyApplicationService, private localStorageService: LocalStorageService, private applicationService: ApplicationService){}
  ngOnInit(): void{
    this.getApplicationDetails();
  }
  getApplicationDetails(){
    this.myApplicationService.get_application_details(this.application_id!).subscribe({
        next: async data => {
          this.orders = await data.orders;
          this.judgements = await data.judgements;
          this.case_details = await data.case_details;
          if(data.profile_details){
            this.profile_details = await data.profile_details;
          }
        }
    })
  }
  async getURL(id:number, date: string, cnr: string, order_no:any,key: string){
    this.get_url.getURL(date,cnr,order_no).then(async (d:any) => {
      if(key === 'view'){
        await window.open(d, '_blank')
      }
      if(key === 'qr'){
        await this.generateQr(date, id, d);
      }
    })
  }
  async getModalKey(key:string){
    this.modelKey = key === 'remarks' ? false : true;
  }
  onRouteView(){
    this.routeView.emit({status: true});
  }
  printPendingReceipt(){
    this.print.generatePendingReceipt(this.application_id!,this.case_details, this.orders,this.judgements,this.profile_details);
  }
  async onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = await new FormData();
      this.btnLoader = await true;
      await this.print.generateCompletedReceipt('generate',this.application_id!,this.case_details, this.orders,this.judgements,this.profile_details).then(d => this.completed_receipt = `data:application/pdf;base64,${d}` );
      await fd.append("remarks", data.value.rem);
      await fd.append("status", this.modelKey ? 'Completed' : 'Pending');
      await fd.append("application_id", this.application_id!);
      if(this.modelKey){
        await fd.append("complete_receipt", this.completed_receipt);
        await this.myApplicationService.updateApplications(fd).subscribe({
          next: data => {
            this.closeBtn.nativeElement.click();
            this.onRouteView();
            this.btnLoader = false;
          },
          error: err => {
            alert('Please upload all the certified copies before proceeding');
            this.btnLoader = false;
          },
        })
      }
      else{
        await this.myApplicationService.updateApplications(fd).subscribe({
          next: data => {
            this.closeBtn.nativeElement.click();
            this.getApplicationDetails();
            this.btnLoader = false;
          }
        })
        data.reset();
      }
    }
  }
  async onGetDocument(date: string, parentElement:any, url:any){
    const watermarkUrl = await `${URL}/api/media/stamp/hcs_logo.jpg`;
    let watermarkImg = await fetch(watermarkUrl).then(res => res.arrayBuffer());
    const file = await `${url}`;
    const existingPdfBytes = await fetch(file).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pdfPages = pdfDoc.getPages();
    const watermark = await pdfDoc.embedJpg(watermarkImg);
    const qr = await pdfDoc.embedJpg(parentElement);
    for(var i=0; i < pdfPages.length; i++){
      pdfPages[i].drawImage(watermark, {x:125, y: 400,opacity: 0.2, height: 400, width: 400},);
      pdfPages[i].drawImage(qr, {x:15,y:15,height: 50, width: 50});
    }
    const pdfBytes = await pdfDoc.save();
    const pdf = window.URL.createObjectURL(new Blob([new Uint8Array(pdfBytes).buffer]));
    const link = document.createElement('a');
    link.href = pdf;
    link.setAttribute('download', `${date}.pdf`);
    link.click();
  }
  generateHash():string {
      var result = Guid.create();
      return result.toString().split('-')[0];
  }
  generateQr(date:string, id:number, url:any){
    setTimeout(() => {
      let hash = this.generateHash();
      let fd = new FormData();
      fd.append('application_id', this.application_id!);
      fd.append('id', id.toString());
      fd.append('view', hash);
      this.value = `${ALT_URL}/details?id=${hash}`;
      this.applicationService.generate_qr(fd).subscribe({
        next: data => {
          let parentElement = document.querySelector('canvas')?.toDataURL('image/jpeg');
          setTimeout(() => {
            this.onGetDocument(date, parentElement, url);
          },500);
        },
        error: err => {
          if(err.error.response === 'exists'){
            alert('Error !! QR for corresponding document has already been generated');
          }
        }
      })
    },1000);
  }
  onGetOrderDate(order_date:string, index:number){
    this.order_judgement = order_date;
    this.index = index;
  }
  onCopyUpload(event:any, key:string){
    if(event.target.files && event.target.files[0]){
      this.copy = event.target.files[0];
      this.copy_name = `${this.application_id!}_${key}_${this.index}.${this.copy.name.split('.')[1]}`;
    }
    let fd = new FormData();
    fd.append('application_id', this.application_id!);
    fd.append('copy', this.copy);
    fd.append('copy_name',this.copy_name);
    fd.append('order_judgement', this.order_judgement);
    this.applicationService.upload_copy(fd).subscribe({
      next: data => {
        this.getApplicationDetails();
      },
      error: err => {
        if(err.error.response === 'Digital'){
          alert('PDF does not contain digital signature. Kindly upload PDF with digital signature');
        }
        else{
          alert('Certified Copy for the corresponding Order/Judgement has already been uploaded');
        }
      }
    })
  }
  onGetCopies(){
    this.applicationService.get_copies(this.application_id!).subscribe({
      next: data => {
        if(!data[0]){
          this.toggleCC = false;
        }
        else{
          this.copies = data
          this.toggleCC = true;
        }
      }
    })
  }
  onDeleteCopies(id:string, index:number, key:string){
    let file_name: string = `${id}_${key}_${index}.pdf`;
    this.applicationService.delete_copies(file_name).subscribe(data => {
      this.onGetCopies();
      this.getApplicationDetails();
    });
  }
}