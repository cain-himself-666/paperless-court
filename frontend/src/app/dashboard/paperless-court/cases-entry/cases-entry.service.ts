import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
@Injectable({ providedIn: 'root'})
export class CasesEntryService{
    constructor(public http: HttpClient){}
    case_entry(fd:any){
        return this.http.post<any>(`${URL}/api/case-entry`, fd);
    }
    uploadDocs(fd:any){
        return this.http.post(`${URL}/api/upload-docs`, fd, { reportProgress: true, observe: "events"});
    }
    get_cases(){
        return this.http.get<any>(`${URL}/api/get-cases`);
    }
    get_entered_cases(){
        return this.http.get<any>(`${URL}/api/case-entry`);
    }
    get_docs(case_id:string){
        return this.http.get<any>(`${URL}/api/get-docs`, { params: { case_id: case_id } } );
    }
    get_doc_types(){
        return this.http.get<any>(`${URL}/api/doc-types`);
    }
    add_indexes(fd: FormData){
        return this.http.post(`${URL}/api/doc-indexes`, fd);
    }
    get_indexes(id:number){
        return this.http.get<any>(`${URL}/api/doc-indexes`, { params: { doc_id: id}});
    }
}