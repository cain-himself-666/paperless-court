import { NgModule } from '@angular/core';
import { ApplyComponent } from './apply.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ApplyComponent,
    SearchComponent,
    PaymentComponent,
    AcknowledgementComponent
  ],
  imports: [
    RouterModule.forChild( [ { path: '', component: ApplyComponent } ] ),
    FormsModule,
    SharedModule
  ],
})
export class ApplyModule { }
