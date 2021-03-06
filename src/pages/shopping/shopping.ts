import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { ProductsServiceProvider } from '../../providers/products-service';
import { Products } from '../../models/products';
import { PurchasedProducts } from '../../models/purchased_products';
import { Cart } from '../../models/cart';
import { Platform } from 'ionic-angular';
import { Tickets } from '../../models/tickets';
import { CartServiceProvider } from '../../providers/cart-service';
import { NotificationsProvider } from '../../providers/notifications-service';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
import { LoadingServiceProvider } from '../../providers/loading-service';
import { Accessories } from '../../utils/accessories';
import { PlacesServiceProvider } from '../../providers/places-service';
import { Places } from '../../models/places';

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
  placesSrv: Places[];
  total: number;
  cart: Cart;
  ticket: Tickets = new Tickets();
  purchasedProducts: PurchasedProducts[] = [];
  filterProductsPerBenefit: boolean;
  quantityProduct: number=0;
  isProductInCart: boolean;
  canPay: boolean = false;

  private sub1$:any;
  private sub2$:any;


  @ViewChild(Navbar) navBar: Navbar;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, 
    public ProductsSrv: ProductsServiceProvider, private CartSrv: CartServiceProvider,
    private NotificationsCtrl: NotificationsProvider, private LoadingCtrl: LoadingServiceProvider,
    private PlacesServiceProvider: PlacesServiceProvider) {
    this.filterProductsPerBenefit = this.navParams.get('filterProductsPerBenefit') ? this.navParams.get('filterProductsPerBenefit') : false;
    this.ProductsSrv.getProducts().subscribe((result)=>{
      this.productsSrv = this.getFilteredProducts(result);
    },
    (err)=>{
      console.log(err);
      this.NotificationsCtrl.presentErrorNotification("Carga de productos fallida.\nError técnico: "+err);
    })

    this.PlacesServiceProvider.getPlaces().subscribe((result)=>{
      this.placesSrv = result;
    },
    (err)=>{
      console.log(err);
      this.NotificationsCtrl.presentErrorNotification("Búsqueda de lugares fallido.\nError técnico: "+err);
    })


    if(localStorage.getItem('cart')){
      this.cart = new Cart(this.CartSrv.getCart());
      this.ticket = this.cart.ticket;
      this.purchasedProducts = this.ticket.purchased_products;

      let emptyQuantityPurchasedProduct = this.purchasedProducts.find(purchasedProduct => {
        return purchasedProduct.quantity < 0;
      })
      this.canPay = emptyQuantityPurchasedProduct ? false : true;
    }
    else{
      this.cart = new Cart();
      this.ticket.date_of_purchase = new Date().toISOString();
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
  

  getFilteredProducts(products){
    return products.filter(item=>{
      if(!this.filterProductsPerBenefit)
        return item.description.includes(this.navParams.get('place').name);
      else{
        return (!item.description.includes('Entrada'));
      }
    })
  }

  setQuantities(product){
    let element = this.purchasedProducts.find(item=>{
      if(item.product.price == product.price) return item;
    })
    return element ? element.quantity.toString() : '';
  }

  ionViewDidLoad() {
    if(this.cart.ticket.purchased_products.length < 1){
      this.canPay = false;
    }
    this.LoadingCtrl.showLoading(1000);
    
  }

  ionViewWillUnload() {
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }

  addQuantity(quantity){
    quantity++;
    return quantity;
  }

  substractQuantity(quantity){
    if(quantity>=0){
      quantity--;
      return quantity;
    }
    if(quantity<0){
      quantity = 0;
      return quantity;
    }
  }

  findPlaceOfProduct(product){
    let placeFinded = this.placesSrv.find(item=>{
      return (product.description.toLowerCase().includes(item.name.toLowerCase()));
    });
    return placeFinded;
  }
  
  addItem(index, product, action){
    let itemIdx = this.purchasedProducts.findIndex(item => {
      return (item.product.description === product.description)
    })
    if(itemIdx !== -1){
        if(action==0){
          this.purchasedProducts[itemIdx].quantity = this.substractQuantity(this.purchasedProducts[itemIdx].quantity);
        }
        else{
          this.purchasedProducts[itemIdx].quantity = this.addQuantity(this.purchasedProducts[itemIdx].quantity);
        }
        if(this.purchasedProducts[itemIdx].quantity > 0){
          this.canPay = true;
        }
        else{
          this.canPay = false;
        }
    }
    else{
      let productToAdd = new PurchasedProducts({_id: null, product: this.productsSrv[index], quantity: 1})
      
      this.purchasedProducts.push(productToAdd);
      if(this.filterProductsPerBenefit){
          let placeOfProduct = this.findPlaceOfProduct(productToAdd.product);
          if(placeOfProduct){
            this.cart.place = placeOfProduct;
          }
      }
      if(this.purchasedProducts[this.purchasedProducts.length-1].quantity > 0){
        this.canPay = true;
      }
      else{
        this.canPay = false;
      }
    }
    
    this.ticket.purchased_products = this.purchasedProducts;
    this.cart.ticket = this.ticket;
    this.CartSrv.setCart(this.cart)
  }

  getTotal(){
    let result = 0;
    this.purchasedProducts.forEach(item=>{
      result += item.product.price * item.quantity;
    })
    return result;
  }

  toCorrectDate(string){
    return Accessories.toCorrectDate(string);
  }


  goToCartPage(){
    this.ticket.total = this.getTotal();
    this.cart.ticket = this.ticket;
    this.CartSrv.setCart(this.cart);
    this.navCtrl.push(ShoppingCartPage);
  }
}
