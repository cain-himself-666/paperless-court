import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes  = [
  { path: '', redirectTo: '/dashboard/rti/apply', pathMatch: 'full'},
  { path: 'apply', loadChildren: () => import('./general/apply/apply.module').then(m => m.ApplyModule) },
  { path: 'my-applications', loadChildren: () => import('./general/my-applications/my-applications.module').then(m => m.MyApplicationsModule) },
  { path: 'receive-applications', loadChildren: () => import('./admin/receive-applications/receive-applications.module').then(m => m.ReceiveApplicationsModule) },
  { path: 'applications', loadChildren: () => import('./admin/applications/applications.module').then(m => m.ApplicationsModule) },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RtiModule { }
