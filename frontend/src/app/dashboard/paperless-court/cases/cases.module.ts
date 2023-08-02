import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CauseListComponent } from './cause-list/cause-list.component';
import { CaseFilesComponent } from './case-files/case-files.component';
import { CasesComponent } from './cases.component';
import { RouterModule } from '@angular/router';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
@NgModule({
  declarations: [
    CasesComponent,
    CauseListComponent,
    CaseFilesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CasesComponent }]),
    PdfJsViewerModule,
  ]
})
export class CasesModule { }
