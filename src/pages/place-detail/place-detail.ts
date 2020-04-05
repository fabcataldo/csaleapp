import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Places } from '../../models/places';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = this.navParams.get('place');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetailPage');
  }

}
