import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class LogService{
    constructor(private http: HttpClient){}

    get_logs(){
        return this.http.get<any>(`${URL}/api/logs`);
    }
}