import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Cart } from '../../models/cart';
import { CartServiceProvider } from '../../providers/cart-service';
import { PaymentMethods } from '../../models/payment_methods';
import { AvailablePaymentMethods } from '../../models/available_payment_methods';
import { ShoppingCheckoutPage } from '../shopping-checkout/shopping-checkout';

/**
 * Generated class for the ShoppingCashPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cash-payment',
  templateUrl: 'shopping-cash-payment.html',
})
export class ShoppingCashPaymentPage {
  cart: Cart;
  amount: number;
  remainingAmount: number;
  cash: AvailablePaymentMethods;
  canPay: boolean = true;
  payment: PaymentMethods;

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private cartSrv: CartServiceProvider) {
    this.cart = this.cartSrv.getCart();
    this.cash = this.navParams.get('paymentMethod');
    this.payment = this.navParams.get('cashPayment');
  }

  ionViewDidLoad() {
    this.remainingAmount = this.cartSrv.getRemainingAmount();
    this.amount = this.payment ? this.payment.amountPaid : this.remainingAmount;
  }

  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonHandler;
  }

  backButtonHandler(){
    this.navCtrl.popTo('ShoppingPage');
  }

  inputChange(event){
    this.amount = parseInt(event.value);
    if(isNaN(this.amount)){
      this.amount = 0;
    }
    
    if(this.payment){
      this.remainingAmount = (this.cartSrv.getRemainingAmount() + this.payment.amountPaid) - this.amount
    }
    else{
      this.remainingAmount = this.cartSrv.getRemainingAmount() - this.amount
    }
    this.canPay = this.remainingAmount >= 0 && this.remainingAmount <= this.cart.ticket.total ? true : false;
  }

  goToCheckoutPage(){
    let newPaymentMethod = new PaymentMethods( 
      { 
        id: null,
        paymentMethod: this.cash,
        card: null,
        amountPaid: this.amount
      }
    )
    this.cartSrv.savePaymentMethod(newPaymentMethod, 'cash');
    this.cartSrv.setCart(this.cart);
    this.navCtrl.push(ShoppingCheckoutPage);
  }
}
