import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsServiceProvider } from '../../providers/products-service';
import { Products } from '../../models/products';
import { PurchasedProducts } from '../../models/purchased_products';
import { Cart } from '../../models/cart';
import { Users } from '../../models/users';
import { Platform } from 'ionic-angular';
import { Tickets } from '../../models/tickets';

/**
 * Generated class for the PurchaseProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {
  productsSrv: Products[];
  total: number;
  cart: Cart;
  ticket: Tickets = new Tickets();
  purchasedProducts: PurchasedProducts[] = [];

  private sub1$:any;
  private sub2$:any;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public ProductsSrv: ProductsServiceProvider) {
    this.ProductsSrv.getProducts().subscribe((result)=>{
      this.productsSrv = result;
    })
    if(localStorage.getItem('cart')){
      this.cart = new Cart(JSON.parse(localStorage.getItem('cart')));
      this.ticket = this.cart.ticket;
      this.purchasedProducts = this.ticket.purchasedProducts;
    }
    else{
      this.cart = new Cart();
      this.ticket.dateOfPurchase = new Date().toISOString();
      this.ticket.user = JSON.parse(localStorage.getItem('user')); 
      this.ticket.purchasedProducts = this.purchasedProducts;
      
      this.cart.user = this.ticket.user;
      this.cart.place = this.navParams.get('place');
      this.cart.ticket = this.ticket;
    }

    this.platform.ready().then(() => {
      this.sub1$=this.platform.pause.subscribe(() => {        
          console.log('****UserdashboardPage PAUSED****');
          localStorage.setItem('cart', JSON.stringify(this.cart));
      });  
      this.sub2$=this.platform.resume.subscribe(() => {      
          console.log('****UserdashboardPage RESUMED****');
          localStorage.setItem('cart', JSON.stringify(this.cart));
      });
    });
  }

  setQuantities(product){
    let element = this.purchasedProducts.find(item=>{
      if(item.product.price == product.price) return item;
    })
    return element ? element.quantity.toString() : '';;
  }

  ionViewDidLoad() {
  }

  ionViewWillUnload() {
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }
  
  addItem(index, event, product){
    let itemIdx = this.purchasedProducts.findIndex(item => {
      return (item.product.description === product.description)
    })
    if(itemIdx !== -1){
      if(event.target.value === ''){
        this.purchasedProducts.splice(itemIdx, 1);
      }
      else{
        this.purchasedProducts[itemIdx].quantity = event.target.value;
      }
    }
    else{
      this.purchasedProducts.push(new PurchasedProducts({_id: null, product: this.productsSrv[index], quantity: event.target.value}));
    }

    this.ticket.purchasedProducts = this.purchasedProducts;
    this.cart.ticket = this.ticket;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    
  }

  goToCheckoutPage(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
