import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Platform } from 'ionic-angular';
import { Tickets } from '../../models/tickets';
import { Cart } from '../../models/cart';
import { PurchasedProducts } from '../../models/purchased_products';
import { ProductsServiceProvider } from '../../providers/products-service';
import { CartServiceProvider } from '../../providers/cart-service';
import { ShoppingCheckoutPage } from '../shopping-checkout/shopping-checkout';
import { ShoppingConfirmPage } from '../shopping-confirm/shopping-confirm';

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  cart: Cart;
  ticket: Tickets = new Tickets();
  purchasedProducts: PurchasedProducts[] = [];
  canPay: boolean;

  private sub1$:any;
  private sub2$:any;

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, 
    public ProductsSrv: ProductsServiceProvider, private CartSrv: CartServiceProvider) {

    if(localStorage.getItem('cart')){
      this.cart = new Cart(this.CartSrv.getCart());
      this.ticket = this.cart.ticket;
      this.purchasedProducts = this.ticket.purchased_products;
      this.canPay = true;
    }
    else{
      this.cart = new Cart();
      this.ticket.date_of_purchase = new Date().toISOString();
      this.ticket.user = JSON.parse(localStorage.getItem('user')); 
      this.ticket.purchased_products = this.purchasedProducts;
      
      this.cart.place = this.navParams.get('place');
      this.cart.ticket = this.ticket;

    }

    this.platform.ready().then(() => {
      this.sub1$=this.platform.pause.subscribe(() => {        
          console.log('****UserdashboardPage PAUSED****');
          this.CartSrv.setCart(this.cart);
      });  
      this.sub2$=this.platform.resume.subscribe(() => {      
          console.log('****UserdashboardPage RESUMED****');
      });
    });
  }

  backButtonHandler(){
    this.navCtrl.popTo('PlaceDetailPage');
  }

  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonHandler;
  }

  ionViewWillUnload() {
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }

  setQuantities(product, showUnits){
    let element = this.purchasedProducts.find(item=>{
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

  removeProduct(index){
    this.purchasedProducts.splice(index, 1);
    this.ticket.purchased_products = this.purchasedProducts;
    this.cart.ticket = this.ticket;
    this.CartSrv.setCart(this.cart);
  }

  getTotal(){
    let result = 0;
    this.purchasedProducts.forEach(item=>{
      result += item.product.price * item.quantity;
    })
    return result;
  }

  goToCheckoutPage(){
    this.ticket.total = this.getTotal();
    this.cart.ticket = this.ticket;
    this.CartSrv.setCart(this.cart);

    if(this.CartSrv.getCart().ticket.payment_methods.length !== 0){
      this.navCtrl.push(ShoppingConfirmPage)
    }
    this.navCtrl.push(ShoppingCheckoutPage);
  }

}
