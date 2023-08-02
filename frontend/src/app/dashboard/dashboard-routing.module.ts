import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
  { path: '', component: DashboardComponent, children: [
      { path: 'home', component: HomeComponent},
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
      { path: 'certified-copy', loadChildren: () => import('./certified-copy/certified-copy.module').then(m => m.CertifiedCopyModule) },
      { path: 'rti', loadChildren: () => import('./rti/rti.module').then(m => m.RtiModule) },
      { path: 'logs', loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
