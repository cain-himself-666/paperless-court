import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
import { CopyDetails } from "./copy-details.interface";

@Injectable({ providedIn: 'root' })
export class CopyDetailsService{
    constructor(private http: HttpClient){}
    view(application_id: string){
        return this.http.get<CopyDetails[]>(`${URL}/api/view`, { params: { id: application_id }});
    }
}