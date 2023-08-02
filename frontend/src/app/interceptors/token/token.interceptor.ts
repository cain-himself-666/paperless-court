import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipInterceptor = request.url.indexOf('https://hcs.gov.in/HighCourtWebService/');
    let authReq = request
    const token = this.localStorageService.getToken();
    if(skipInterceptor === 0){
      authReq = request.clone();
    }
    else{
      if(token != null){
        authReq = request.clone({ headers: new HttpHeaders().set('Authorization', `Token ${token}`)});
      }
    }
    return next.handle(authReq).pipe(catchError((error: any) => {
      if(error.error.detail === 'Invalid token.' || error.error.detail == 'The given token has expired.'){
        alert('Session Expired !! Please Login Again');
        this.localStorageService.clearSession();
        window.location.href = '/';
      }
      return throwError(() => error);
    }));
  }
}
