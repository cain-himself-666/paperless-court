import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";

@Injectable()
export class ReceiveApplicationService{
    constructor(private http: HttpClient) {}

    receive_rti(fd: FormData){
        return this.http.post<any>(`${URL}/api/rti/application`, fd);
    }
}