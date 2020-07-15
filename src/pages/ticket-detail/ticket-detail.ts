import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tickets } from '../../models/tickets';
import { Accessories } from '../../utils/accessories';
import { CartServiceProvider } from '../../providers/cart-service';
import { HomePage } from '../home/home';
import { NotificationsProvider } from '../../providers/notifications-service';

@IonicPage()
@Component({
  selector: 'page-ticket-detail',
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailPage {
  ticket: Tickets;
  isShopping: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private CartSrv: CartServiceProvider) {
    this.ticket = this.navParams.get('ticket') ? this.navParams.get('ticket') : null;
    this.isShopping = this.navParams.get('isShopping') ? this.navParams.get('isShopping') : false;
  }

  toCapitalize(str){
    return Accessories.capitalizeFirstChar(str);
  }

  toCorrectDate(string){
    return Accessories.toCorrectDate(string);
  }

  goToHomePage(){
    this.CartSrv.uploadCart();
    this.navCtrl.setRoot(HomePage);
  }

}
