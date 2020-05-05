import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Places } from '../../models/places';
import { PlacesServiceProvider } from '../../providers/places-service';
import { ShoppingPage } from '../shopping/shopping';
import { NotificationsProvider } from '../../providers/notifications-service';

/**
 * Generated class for the PlaceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailPage {
  place : Places;
  freeSpace : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private PlaceSrv: PlacesServiceProvider,
    private NotificationsCtrl: NotificationsProvider) {
    this.place = this.navParams.get('place');

    this.PlaceSrv.getFreeSpace(this.place._id).subscribe((result)=>{
      this.freeSpace = result;
    }),
    (err)=>{
      this.NotificationsCtrl.presentErrorNotification("No se pudo obtener información sobre el espacio del lugar.\nError técnico: "+err);
    };
  }

  ionViewDidLoad() {
  }

  goToShoppingPage(){
    this.navCtrl.push(ShoppingPage, {place: this.place});
  }
}
