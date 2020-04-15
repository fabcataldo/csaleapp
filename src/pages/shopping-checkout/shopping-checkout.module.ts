import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCheckoutPage } from './shopping-checkout';

@NgModule({
  declarations: [
    ShoppingCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCheckoutPage),
  ],
})
export class ShoppingCheckoutPageModule {}
