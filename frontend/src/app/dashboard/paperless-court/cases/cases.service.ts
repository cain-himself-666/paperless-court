import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL, CIS_URL } from "src/environment/environment";
@Injectable({ providedIn: 'root' })
export class CasesServices{
    constructor(private http: HttpClient){}
    get_cause_list(date: any){
        return this.http.get<any>(`${URL}/api/get-causelist`, { params: { date: date } } );
    }
    view_docs(cnr:string){
      return this.http.get<any>(`${URL}/api/view-details`, { params: { cnr: cnr } } );
    }
    get_orders(cnr: string){
      return this.http.get<any>(`${CIS_URL}?hgordertoken=${cnr}`)
    }
}