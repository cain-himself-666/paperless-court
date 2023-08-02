import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/environment/environment';
import { AuthInterface } from '../../interfaces/auth.interface';
import { tap } from 'rxjs';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  login(data: FormData){
    return this.http.post<AuthInterface>(`${URL}/api/auth/login/`, data)
                    .pipe(tap(respData => this.localStorageService.saveData(respData)));
  }
  logout(){
    return this.http.post(`${URL}/api/auth/logout/`, {})
                    .pipe(tap(respData => this.localStorageService.clearSession()));
  }
}
