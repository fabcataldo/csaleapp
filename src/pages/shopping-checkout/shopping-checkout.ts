import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cart } from '../../models/cart';
import { Tickets } from '../../models/tickets';

/**
 * Generated class for the ShoppingCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-checkout',
  templateUrl: 'shopping-checkout.html',
})
export class ShoppingCheckoutPage {
  cart: Cart;
  remainingAmount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cart = this.navParams.get('cart');
  }

  getTotalPaid(){
    let total = 0;
    this.cart.ticket.paymentMethods.forEach(item => {
      total+=item.amountPaid;
    })
    return total
  }
  ionViewDidLoad() {
    this.remainingAmount = this.cart.ticket.total - this.getTotalPaid();
  }

  

}
