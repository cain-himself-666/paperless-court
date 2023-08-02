import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
interface Organizations{
    count : number;
    next: number | null;
    previous: number | null;
    results: Array<any>;
}
@Injectable({ providedIn: 'root' })
export class ApplicationService{
    constructor(private http: HttpClient){}
    get_applications(status: string){
        return this.http.get<any>(`${URL}/api/rti/application`, { params: { status: status}});
    }
    get_application(id:number){
        return this.http.get<any>(`${URL}/api/rti/application/${id}`);
    }
    update_application(fd: FormData){
        return this.http.patch(`${URL}/api/rti/application/${fd.get('id')}`, fd);
    }
    get_organizations(){
        return this.http.get<Organizations>(`${URL}/api/account/organisation`);
    }
    forward_application(fd: FormData){
        return this.http.post(`${URL}/api/rti/application/forwrded_to`,fd);
    }
}