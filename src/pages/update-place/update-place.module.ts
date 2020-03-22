import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePlacePage } from './update-place';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    UpdatePlacePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePlacePage),
    IonicSelectableModule
  ],
})
export class UpdatePlacePageModule {}
