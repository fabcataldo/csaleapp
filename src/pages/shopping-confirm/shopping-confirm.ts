import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service';
import { Tickets } from '../../models/tickets';
import { Cart } from '../../models/cart';
import { HomePage } from '../home/home';
import { Accessories } from '../../utils/accessories';

/**
 * Generated class for the ShoppingConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-confirm',
  templateUrl: 'shopping-confirm.html',
})
export class ShoppingConfirmPage {
  cart: Cart;

  constructor(public navCtrl: NavController, public navParams: NavParams, private CartSrv: CartServiceProvider) {
    this.cart = this.CartSrv.getCart();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingConfirmPage');
  }

  toCapitalize(str){
    return Accessories.capitalizeFirstChar(str);
  }

  setQuantities(product, showUnits){
    let element = this.cart.ticket.purchased_products.find(item=>{
      if(item.product.price == product.price) return item;
    })
    return element ? 
      showUnits ? 
        element.quantity == 1 ? 
          element.quantity.toString() + ' unidad'
        :
          element.quantity.toString() + ' unidades'
      :
        element.quantity.toString()
    : '';
  }

  goToHomePage(){
    console.log(this.cart)
    this.CartSrv.uploadCart();
    this.CartSrv.saveNewData();
    this.navCtrl.setRoot(HomePage);
  }

}

