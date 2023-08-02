import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";

@Injectable({ providedIn: 'root' })
export class ProfileService{
    constructor(private http: HttpClient){}
    update_password(fd:any){
        return this.http.post(`${URL}/api/update-password`,fd);
    }
    update_profile(fd:any){
        return this.http.post(`${URL}/api/update-profile`, fd);
    }
}