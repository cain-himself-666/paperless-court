import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-paperless-court',
  templateUrl: './paperless-court.component.html',
  styleUrls: ['./paperless-court.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaperlessCourtComponent {
  username: string = '';
  constructor(private localStorageService: LocalStorageService, private authService: AuthService){}
  ngOnInit(): void{
    this.username = this.localStorageService.getDetails().first_name;
  }
  onLogout(){
    this.authService.logout().subscribe({
        complete: () => {
            window.location.href = '/'
        }
    })
}
}
