import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Places } from '../../models/places';
import { PlacesServiceProvider } from '../../providers/places-service';
import { ShoppingPage } from '../shopping/shopping';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private PlaceSrv: PlacesServiceProvider) {
    this.place = this.navParams.get('place');

    this.PlaceSrv.getFreeSpace(this.place._id).subscribe((result)=>{
      this.freeSpace = result;
    });
  }

  ionViewDidLoad() {
  }

  goToShoppingPage(){
    this.navCtrl.push(ShoppingPage, {place: this.place});
  }
}
