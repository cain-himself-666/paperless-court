import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaperlessCourtComponent } from './paperless-court.component';
import { HomeComponent } from '../paperless-court/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/paperless-court/home', pathMatch: 'full'},
  { path: '', component: PaperlessCourtComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cases', loadChildren: () => import('./cases/cases.module').then(m => m.CasesModule)},
      { path: 'cases-entry', loadChildren: () => import('./cases-entry/cases-entry.module').then(m => m.CasesEntryModule)},
      { path: 'causelist', loadChildren: () => import('./causelist/causelist.module').then(m => m.CauselistModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaperlessCourtRoutingModule { }
