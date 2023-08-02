import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarMenusComponent } from './components/sidebar/sidebar-menus/sidebar-menus.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { PageCalculatorLoaderComponent } from './components/page-calculator-loader/page-calculator-loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarMenusComponent,
    LoaderComponent,
    PageCalculatorLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PageCalculatorLoaderComponent,
    CommonModule,
  ]
})
export class SharedModule { }
