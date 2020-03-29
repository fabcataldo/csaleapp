import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasesMadePage } from './purchases-made';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    PurchasesMadePage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasesMadePage),
    NgxDatatableModule
  ],
  
})
export class PurchasesMadePageModule {}
