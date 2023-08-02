import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
@Injectable({ providedIn: 'root' })
export class ApplicationService{
    constructor(private http: HttpClient){}
    getApplications(status: string){
        return this.http.get<any>(`${URL}/api/get-applications`, { params: { status: status }});
    }
    generate_qr(fd:FormData){
        return this.http.post(`${URL}/api/generate-qr`, fd)
    }
    upload_copy(fd:FormData){
        return this.http.post(`${URL}/api/copy`,fd)
    }
    get_copies(application_id:string){
        return this.http.get<any>(`${URL}/api/copy`, {params: { application_id: application_id} })
    }
    delete_copies(file_name: string){
        return this.http.delete(`${URL}/api/copy?filename=${file_name}`)
    }
}