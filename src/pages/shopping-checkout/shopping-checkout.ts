import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Cart } from '../../models/cart';
import { Tickets } from '../../models/tickets';
import { CartServiceProvider } from '../../providers/cart-service';
import { ShoppingCashPaymentPage } from '../shopping-cash-payment/shopping-cash-payment';
import { ShoppingCardPaymentPage } from '../shopping-card-payment/shopping-card-payment';
import { AvailablePaymentMethodsServiceProvider } from '../../providers/available-payment-methods';
import { AvailablePaymentMethods } from '../../models/available_payment_methods';
import { Accessories } from '../../utils/accessories';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';

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
  availablePaymentMethods: AvailablePaymentMethods[];
  canPay: boolean;

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private CartSrv: CartServiceProvider, private availablePaymentMethodsSrv: AvailablePaymentMethodsServiceProvider) {
      this.setCart();
      this.getAvailablePaymentMethods();
  }

  ionViewDidLoad() {
    this.setRemainingAmount();
    this.setCanPay();
  }

  setCart(){
    this.cart = new Cart(this.CartSrv.getCart());
  }

  setCanPay(){
    this.canPay = this.remainingAmount > 0 && this.remainingAmount <= this.cart.ticket.total ? true : false;
  }

  setRemainingAmount(){
    this.remainingAmount = this.CartSrv.getRemainingAmount();
  }

  async getAvailablePaymentMethods(){
    await this.availablePaymentMethodsSrv.getAvailablePaymentMethods().subscribe(data=>{
      this.availablePaymentMethods = data;
    })
  }

  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonHandler;
  }

  backButtonHandler(){
    this.navCtrl.popTo('ShoppingPage');
  }

  goToPaymentPage(paymentMethod){
    if(paymentMethod.paymentMethod.name === 'efectivo'){
      this.goToCashPaymentPage(paymentMethod);
    }
    if(paymentMethod.paymentMethod.name === 'tarjeta'){
      this.goToCardPaymentPage(paymentMethod);
    }
    
  }

  goToCashPaymentPage(payment?:any){
    this.navCtrl.push(ShoppingCashPaymentPage, {
      paymentMethod:
        this.availablePaymentMethods.find(item => item.name == 'efectivo'),
      cashPayment: payment ? payment : this.CartSrv.findPaymentMethod(null, 'cash') !== -1 ?
        this.cart.ticket.payment_methods[this.CartSrv.findPaymentMethod(null, 'cash')] : null
    });
  }

  goToCardPaymentPage(payment?:any){
    this.navCtrl.push(ShoppingCardPaymentPage, {
      paymentMethod: this.availablePaymentMethods.find(item => item.name == 'tarjeta'),
      cardPayment: payment ? payment : null
    });
  }

  goToMercadoPago(){
    console.log('No implementado')
  }

  removePayment(paymentMethod){
    let type = (paymentMethod.paymentMethod.name === 'efectivo') 
      ? 'cash' : (paymentMethod.paymentMethod.name === 'tarjeta') ? 'card' : 'mercadopago'; 
    this.CartSrv.removePaymentMethod(paymentMethod, type);
    this.cart = this.CartSrv.getCart();

    this.setRemainingAmount();
    this.setCanPay();
  }

  toCapitalize(str){
    return Accessories.capitalizeFirstChar(str);
  }

  goToTicketDetailPage(){
    this.CartSrv.setCart(this.cart);
    this.navCtrl.push(TicketDetailPage, {isShopping: true})
  }
}
