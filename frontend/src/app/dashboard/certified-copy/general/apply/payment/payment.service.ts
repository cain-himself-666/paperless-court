import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
interface PaymentMaster{
    offline_mode: number;
    online_mode: number;
}
@Injectable({providedIn: 'root'})
export class PaymentsService{
    constructor(private http: HttpClient){}
    payment_master(){
        return this.http.get<PaymentMaster>(`${URL}/api/payments`);
    }
    submitApplication(fd:FormData){
        return this.http.post<{response: string}>(`${URL}/api/payments`, fd);
      }
}