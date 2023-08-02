import { Component, EventEmitter,Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username:string = '';
  localStorage: any;
  @Output() onToggle = new EventEmitter<boolean>();
  @Input() toggleValue: boolean = false;
  constructor(private authService: AuthService){}
  onInitToggle(){
    this.toggleValue = !this.toggleValue;
    this.onToggle.emit(this.toggleValue);
  }
  onLogout(){
    this.authService.logout().subscribe({
      next: () => window.location.href = '/',
    });
  }
}
