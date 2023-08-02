import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplyRTI } from "src/app/shared/interfaces/apply-rti.interface";
import { URL } from "src/environment/environment";

@Injectable({ providedIn: 'root'})
export class MyApplicationServices{
    constructor(private http: HttpClient){}

    get_applications(){
        return this.http.get<{count:number, next:number, previous: number, results: any}>(`${URL}/api/rti/application`);
    }
    get_application_details(id:number){
        return this.http.get<ApplyRTI>(`${URL}/api/rti/application/${id}`);
    }
}