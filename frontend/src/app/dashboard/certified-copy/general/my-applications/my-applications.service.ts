import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ApplicationCaseDetails } from "src/app/shared/interfaces/case-details.interface";
import { FetchedOJ } from "src/app/shared/interfaces/fetched-oj.interface";
import { MyApplication } from "src/app/shared/interfaces/my-applications.interface";
import { ProfileDetails } from "src/app/shared/interfaces/profile-details.interface";
import { CIS_URL, URL } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class MyApplicationService{
    constructor(public http: HttpClient){}
    get_my_applications(){
        return this.http.get<MyApplication[]>(`${URL}/api/applications`)
    }
    get_application_details(application_id: string){
        return this.http.get<{application_details: Array<any>, case_details: {case_number: string, parties: string}, profile: any, payment_details: any}>(`${URL}/api/application-details`, { params: { application_id: application_id }})
                        .pipe(map(respData => {
                            const response_data:{orders: Array<FetchedOJ>, judgements: Array<FetchedOJ>, case_details: ApplicationCaseDetails, profile_details?: ProfileDetails} = {
                                orders: [],
                                judgements: [],
                                case_details: {
                                    cnr: '',
                                    case_number: '',
                                    res_name: '',
                                    pet_name: ''
                                },
                            };
                            respData.application_details.forEach((data: any) => {
                                if(data.order_number === 0){
                                    response_data.judgements.push({id: data.id, date: data.order_date, pages: data.number_of_pages, copies: data.number_of_copies, cert_copy: data.copies});
                                }
                                else{
                                    response_data.orders.push({id:data.id, date: data.order_date, number: data.order_number, pages: data.number_of_pages, copies: data.number_of_copies, cert_copy: data.copies});
                                }
                                response_data.case_details.cnr = data.cnr;
                            })
                            response_data.case_details.case_number = respData.case_details.case_number;
                            response_data.case_details.res_name = respData.case_details.parties.toString().split('vs')[1];
                            response_data.case_details.pet_name = respData.case_details.parties.toString().split('vs')[0];
                            if(respData.payment_details && respData.profile){
                                response_data.profile_details = {
                                    mode: respData.payment_details.mode_of_payment,
                                    is_accused: respData.profile.is_accused,
                                    user_type: respData.profile.user_type,
                                    total_pages: respData.payment_details.total_pages,
                                    copies: respData.payment_details.copies,
                                    total_cost: respData.payment_details.total_cost,
                                    reason: respData.payment_details.reason,
                                    remarks: respData.profile.remarks,
                                    applicant_name: respData.profile.applicant_name,
                                    applicant_contact: respData.profile.applicant_contact,
                                    application_date: respData.profile.application_date,
                                    applicant_id: respData.profile.applicant_id,
                                    bar_id: respData.profile.bar_id,
                                    issued_date: respData.profile.issued_date,
                                    collected_date: respData.profile.collected_date,
                                    application_status: respData.profile.application_status,
                                }
                            }
                            return response_data;
                        }));
    }
    getOrdFileName(date: string, cnr:string){
        return this.http.get<any>(`${CIS_URL}?order_dt=${date}&cnr=${cnr}`);
    }
    getJudFileName(date: string, cnr:string){
        return this.http.get<any>(`${CIS_URL}?jud_dt=${date}&cnr=${cnr}`);
    }
    deleteDraftApplication(fd:FormData){
        return this.http.post(`${URL}/api/delete-application`, fd);
    }
    updateApplications(fd:FormData){
        return this.http.post(`${URL}/api/get-applications`, fd);
    }
}