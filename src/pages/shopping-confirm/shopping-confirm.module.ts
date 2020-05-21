import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingConfirmPage } from './shopping-confirm';

@NgModule({
  declarations: [
    ShoppingConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingConfirmPage),
  ],
})
export class ShoppingConfirmPageModule {}
