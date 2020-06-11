import { Products } from "./products";
import { Accessories } from '../utils/accessories';

export class PurchasedProducts {
    _id: number;
    product : Products;
    quantity: number;

    constructor(purchasedProducts ? : any) {
        if(purchasedProducts){
            this._id = purchasedProducts._id ? purchasedProducts._id : null;
            this.product = Accessories.mapModelObject(purchasedProducts.product, 'products');
            this.quantity = purchasedProducts.quantity ? purchasedProducts.quantity : 0;
        }
    }
}