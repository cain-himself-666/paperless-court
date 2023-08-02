import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class ChatGPT{
    constructor(private http: HttpClient){}

    send_chat_gpt(query: string){
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ]
        }
        return this.http.post<any>(`${URL}/api/chatgpt/`, data);
    }
}