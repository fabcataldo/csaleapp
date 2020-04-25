import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCardPaymentPage } from './shopping-card-payment';

@NgModule({
  declarations: [
    ShoppingCardPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCardPaymentPage),
  ],
})
export class ShoppingCardPaymentPageModule {}
