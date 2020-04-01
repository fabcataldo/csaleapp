import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasesMadePage } from './purchases-made';

@NgModule({
  declarations: [
    PurchasesMadePage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasesMadePage)
  ],
  
})
export class PurchasesMadePageModule {}
