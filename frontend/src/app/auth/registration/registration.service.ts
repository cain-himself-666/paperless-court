import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdvocateDetails } from "./adv-details.interface";
import { URL } from "src/environment/environment";
import { catchError } from "rxjs";

@Injectable({providedIn: 'root'})
export class RegistrationService{
    constructor(private http: HttpClient){}
    get_otp(data: FormData){
        return this.http.post<string>(`${URL}/api/otp`, data);
    }
    verify_otp(contact:string, otp: string, user_type: string){
        return this.http.get<AdvocateDetails | any>(`${URL}/api/otp`, { params: { 'contact': contact, 'otp': otp, 'user': user_type == 'advocate' ? '1' : '0'} })
    }
    register_user(data: FormData){
        return this.http.post<string>(`${URL}/api/register`, data);
    }
}