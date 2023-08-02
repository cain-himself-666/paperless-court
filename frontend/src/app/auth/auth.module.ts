import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', redirectTo: '/auth/login/r', pathMatch: 'full'},
  { path: '', component: AuthComponent, children: [
      { path: 'login', redirectTo: '/auth/login/p', pathMatch: 'full' },
      { path: 'login', data: { animation: 'isLeft' },
        children: [
          { path: 'r', component: LoginComponent },
          { path: 'c', component: LoginComponent },
          { path: 'p', component: LoginComponent },
        ] 
      },
      { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule), data: { animation: 'isRight'} },
    ]
  }
]
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class AuthModule { }
