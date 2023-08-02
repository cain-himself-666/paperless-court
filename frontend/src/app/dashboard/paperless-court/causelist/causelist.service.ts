import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
@Injectable({ providedIn: 'root' })
export class CauseListService{
    constructor(private http: HttpClient){}
    create_cause_list(fd:any){
        return this.http.post(`${URL}/api/get-cases`, fd)
    }
}