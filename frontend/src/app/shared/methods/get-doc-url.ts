import { MyApplicationService } from "src/app/dashboard/certified-copy/general/my-applications/my-applications.service";
export class GetUrl{
    constructor(private myApplicationService: MyApplicationService){}
    async getURL(date: string, cnr: string, order_no:any){
      let url: string = '';
      if(order_no === 0){
        await this.myApplicationService.getJudFileName(date, cnr).subscribe(data => {
          url = `https://hcs.gov.in/hcs/hg_orders/${data[0].filename}`;
        })
      }
      else{
        await this.myApplicationService.getOrdFileName(date, cnr).subscribe(data => {
          url = `https://hcs.gov.in/hcs/hg_orders/${data[0].orderpdf}`;
        })
      }
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(url);
        }, 300)
      });
    }
}