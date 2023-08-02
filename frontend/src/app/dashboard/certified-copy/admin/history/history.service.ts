import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MyApplication } from "src/app/shared/interfaces/my-applications.interface";
import { URL } from "src/environment/environment";
@Injectable({providedIn: 'root'})
export class HistoryService{
    constructor(private http: HttpClient){}
    getHistory(){
        return this.http.get<MyApplication[]>(`${URL}/api/application-history`);
    }
}