import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CIS_URL, URL } from "src/environment/environment";
import { AllCaseDetails } from "./interfaces/all-case-details";
import { Advocates } from "./interfaces/advocates.interface";
import { Acts } from "./interfaces/acts.interface";
import { IA } from "./interfaces/ia.interface";
import { Notes } from "./interfaces/notes.interface";

@Injectable({ providedIn: 'root' })
export class MyCasesService{
    constructor(public http:HttpClient) {}
    get_all_case_details(cnr:string){
        return this.http.get<AllCaseDetails[]>(`${CIS_URL}`, { params: { hgcasetoken: cnr } } );
    }
    get_bench(cnr:string){
        return this.http.get<{judgename: string}[]>(`${CIS_URL}`, { params: { hgcurrenttoken: cnr } });
    }
    get_petitioners(cnr:string){
        return this.http.get<Advocates[]>(`${CIS_URL}`, { params: { hgadvocatetoken_pet: cnr } });
    }
    get_respondents(cnr:string){
        return this.http.get<Advocates[]>(`${CIS_URL}`, { params: { hgadvocatetoken_res: cnr } });
    }
    get_acts(cnr:string){
        return this.http.get<Acts[]>(`${CIS_URL}`, { params: { hgactsectiontoken: cnr } });
    }
    get_ia(cnr:string){
        return this.http.get<IA[]>(`${CIS_URL}`, { params: { hgiatoken: cnr } });
    }
    add_cases(fd: FormData){
        return this.http.post(`${URL}/api/mycases`, fd);
    }
    get_my_cases(){
        return this.http.get<{case_number:string, cnr:string}[]>(`${URL}/api/mycases`);
    }
    delete_cases(fd:FormData){
        return this.http.post(`${URL}/api/deletecases`, fd);
    }
    get_notes(cnr:string){
        return this.http.get<Notes[]>(`${URL}/api/notes`, { params: { cnr: cnr }});
    }
    add_note(fd:FormData){
        return this.http.post(`${URL}/api/notes`, fd);
    }
    delete_note(fd:FormData){
        return this.http.post(`${URL}/api/deletenotes`, fd);
    }
}