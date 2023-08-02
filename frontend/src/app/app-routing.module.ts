import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChatGptComponent } from './chat-gpt/chat-gpt.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login/p', pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: 'chat-gpt', component: ChatGptComponent},
  // { path: 'details', loadChildren: () => import('./copy-details/copy-details.module').then(m => m.CopyDetailsModule) },
  { path: 'paperless-court', loadChildren: () => import('./dashboard/paperless-court/paperless-court.module').then(m => m.PaperlessCourtModule) },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
