import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CIS_URL, URL } from "src/environment/environment";
import { CaseType } from "./interfaces/case-type.interface";
import { CaseDetails } from "./interfaces/case-detail.interface";
import { Order } from "./interfaces/order.interface";
import { Judgement } from "./interfaces/judgement.interface";
@Injectable({ providedIn: 'root'})
export class SearchService{
    constructor(private http: HttpClient){}
    get_case_types(){
        return this.http.get<CaseType[]>(`${CIS_URL}`, { params: { hgcasetype: '1'}});
    }
    get_case_details(case_type:string, case_number:string, year:string){
        return this.http.get<CaseDetails[]>(`${CIS_URL}`, { params: { hgcaseno: case_number, hgyear: year, hgcasetypefil: case_type } } );
    }
    get_orders(cnr:string){
        return this.http.get<Order[]>(`${CIS_URL}`, { params: { hgordertoken: cnr } } );
    }
    get_judgements(cnr:string){
        return this.http.get<Judgement[]>(`${CIS_URL}`, { params: { hgjudtoken: cnr } } );
    }
    saveApplication(count:number, data:any){
        const req = {
          count: count,
          data: data
        }
        return this.http.post<{response: string, id: string}>(`${URL}/api/applications`,req);
    }
}