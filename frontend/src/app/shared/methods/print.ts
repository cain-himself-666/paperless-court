import * as pdfMake  from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { URL } from "src/environment/environment";
import { getBase64ImageFromURL } from "./base-64-url";
import { ProfileDetails } from "../interfaces/profile-details.interface";
import { ApplicationCaseDetails } from "../interfaces/case-details.interface";
import { FetchedOJ } from "../interfaces/fetched-oj.interface";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export class Print{
    completed_receipt:any;
    async generatePendingReceipt(application_id: string, case_details: ApplicationCaseDetails, orders:Array<FetchedOJ>, judgements: Array<FetchedOJ>, profile: ProfileDetails){ 
      let docDefinition:any = {  
          content: [
            {
              image: await getBase64ImageFromURL(`${URL}/api/media/stamp/hcs_logo.jpg`),
              fit: [150, 150],
              alignment: 'center',
            },
            {
              text: 'Certified Copy Receipt',
              fontSize: 20,
              margin: [0, 20, 0, 0],
              alignment: 'center',
            },
            {
              columns: [
                {
                  text: [{text: 'Application ID', bold:true},`: ${application_id}`],
                },
                {
                  text: [{text: 'Applicant Name', bold:true},`: ${profile.applicant_name}`],
                },
                {
                  text: [{text: 'Date of Applied', bold:true},`: ${profile.application_date}`],
                },
              ],
              margin: [0, 25, 0, 0]
            },
            {
              columns: [
                {
                  text: [{text: 'Mode', bold:true},`: ${profile.mode}`]
                },
                {
                  text: [{text: 'Total Cost', bold:true},`: ₹ ${profile.total_cost}`]
                },
                {
                  text: [{text: 'Reason', bold:true},`: ${profile.reason || 'N/A'}`]
                }
              ],
              margin: [0, 25, 0, 0]
            },
            {
              table: {
                headerRows: 1,
                widths: ['7%','*', '10%', '10%', '15%' ],
                body: orders[0] ? [['S.No.','Order Date', 'Pages', 'Copies', 'Cost']].concat(orders.map((data: any, index:number) => [index+1, data.date, data.pages, data.copies, `₹ ${data.pages*data.copies*3}`])) : '',
              },
              margin: [0,25,0,0],
            },
            {
                table: {
                  headerRows: 1,
                  widths: judgements[0] ? ['7%','*', '10%', '10%', '15%' ]: ['*'],
                  body: judgements[0] ? [['S.No.','Judgment Date', 'Pages', 'Copies', 'Cost']].concat(judgements.map((data: any, index:number) => [index+1, data.date, data.pages, data.copies, `₹ ${data.pages*data.copies*3}`])) : [''],
                },
                margin: [0,25,0,0],
            }
          ]  
        };  
        pdfMake.createPdf(docDefinition).open();
    }
    async generateCompletedReceipt(status: string, application_id: string, case_details: ApplicationCaseDetails, orders:any, judgements: any, profile: ProfileDetails){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        let issued_date = `${dd}-${mm}-${yyyy}`;
        let docDefinition:any = {
          content: [
            {
              image: await getBase64ImageFromURL(`${URL}/api/media/stamp/hcs_logo.jpg`),
              fit: [150, 150],
              alignment: 'center',
            },
            {
              text: 'Certified Copy Receipt',
              fontSize: 20,
              margin: [0, 20, 0, 0],
              alignment: 'center',
            },
            {
              columns: [
                {
                  text: [{text: 'Application ID', bold:true},`: ${application_id}`],
                },
                {
                  text: [{text: 'Applicant Name', bold:true},`: ${profile.applicant_name}`],
                },
                {
                  text: [{text: 'Date of Applied', bold:true},`: ${profile.application_date}`],
                },
              ],
              margin: [0, 25, 0, 0]
            },
            {
              columns: [
                {
                  text: [{text: 'Mode', bold:true},`: ${profile.mode}`]
                },
                {
                  text: [{text: 'Total Cost', bold:true},`: ₹ ${profile.total_cost}`]
                },
                {
                  text: [{text: 'Reason', bold:true},`: ${profile.reason || 'N/A'}`]
                }
              ],
              margin: [0, 25, 0, 0]
            },
            {
              columns: [
                {
                  text: [{text: 'Date of Issued', bold:true},`: ${issued_date}`]
                },
              ],
              margin: [0, 25, 0, 0]
            },
            {
              table: {
                headerRows: 1,
                widths: ['7%','*', '10%', '10%', '15%' ],
                body: orders[0] ? [['S.No.','Order Date', 'Pages', 'Copies', 'Cost']].concat(orders.map((data: any, index:number) => [index+1, data.date, data.pages, data.copies, `₹ ${data.pages*data.copies*3}`])) : '',
              },
              margin: [0,25,0,0],
            },
            {
                table: {
                  headerRows: 1,
                  widths: judgements[0] ? ['7%','*', '10%', '10%', '15%' ]: ['*'],
                  body: judgements[0] ? [['S.No.','Judgment Date', 'Pages', 'Copies', 'Cost']].concat(judgements.map((data: any, index:number) => [index+1, data.date, data.pages, data.copies, `₹ ${data.pages*data.copies*3}`])) : [''],
                },
                margin: [0,25,0,0],
            },
            {
              qr: `${URL}/api/media/certified_copies_receipt/${application_id}_receipt.pdf`,
              fit: 100,
              margin: [0, 60, 0, 60]
            }
          ],
        };
        let file = pdfMake.createPdf(docDefinition);
        if(status == 'print'){
          pdfMake.createPdf(docDefinition).open()
        }  
        else{
          return new Promise((resolve, reject) => {
            file.getBase64(data => {
              this.completed_receipt = data;
              resolve(this.completed_receipt);
            })
          })
        }
    }
}