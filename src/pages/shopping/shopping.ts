import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsServiceProvider } from '../../providers/products-service';
import { Products } from '../../models/products';

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
  products: Products[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ProductsSrv: ProductsServiceProvider) {
    this.ProductsSrv.getProducts().subscribe((result)=>{
      this.products = result;
    })
  }

  ionViewDidLoad() {

  }

}
