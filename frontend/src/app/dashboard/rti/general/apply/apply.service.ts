import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplyRTI } from "src/app/shared/interfaces/apply-rti.interface";
import { URL } from "src/environment/environment";

@Injectable({ providedIn: 'root'})
export class ApplyService{
    constructor(private http: HttpClient) {}
    apply(fd: FormData){
        return this.http.post<ApplyRTI>(`${URL}/api/rti/application`, fd);
    }
}