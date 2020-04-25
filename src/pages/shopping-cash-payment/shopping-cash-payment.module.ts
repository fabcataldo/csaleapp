import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCashPaymentPage } from './shopping-cash-payment';

@NgModule({
  declarations: [
    ShoppingCashPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCashPaymentPage),
  ],
})
export class ShoppingCashPaymentPageModule {}
