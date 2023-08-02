import { Injectable } from '@angular/core';
import { AuthInterface } from '../../interfaces/auth.interface';
import * as CryptoJS from 'crypto-js';
import { KEY } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public saveData(data: AuthInterface){
    if(window.localStorage.getItem('token') || window.localStorage.getItem('details') || window.localStorage.getItem('expiry')){
      window.localStorage.clear();
    }
    window.localStorage.setItem('token', data.token);
    window.localStorage.setItem('expiry', data.expiry);
    window.localStorage.setItem('details', CryptoJS.AES.encrypt(JSON.stringify(data.user), KEY).toString());
  }
  public getToken(){
    return window.localStorage.getItem('token');
  }
  public getDetails(){
    let data:any = window.localStorage.getItem('details');
    let res_data = JSON.parse(CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8));
    return res_data;
  }
  public clearSession(){
    window.localStorage.clear();
  }
}
