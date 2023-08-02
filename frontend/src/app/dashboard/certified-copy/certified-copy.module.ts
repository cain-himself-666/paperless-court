import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard/certified-copy/apply', pathMatch: 'full'},
  { path: 'apply', loadChildren: () => import('./general/apply/apply.module').then(m => m.ApplyModule) },
  { path: 'history', loadChildren: () => import('./admin/history/history.module').then(m => m.HistoryModule) },
  { path: 'applications', loadChildren: () => import('./admin/applications/applications.module').then(m => m.ApplicationsModule) },
  { path: 'my-applications', loadChildren: () => import('./general/my-applications/my-applications.module').then(m => m.MyApplicationsModule) },
  { path: 'my-cases', loadChildren: () => import('./general/my-cases/my-cases.module').then(m => m.MyCasesModule) },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CertifiedCopyModule { }
