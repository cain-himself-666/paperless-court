import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './applications.component';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/rti/applications/view', pathMatch: 'full'},
  { path: '', component: ApplicationsComponent,
    children: [
      { path: 'view', loadChildren: () => import('./view/view.module').then(m => m.ViewModule ) },
      { path: 'details/:id', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
