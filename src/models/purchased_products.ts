import { Products } from "./products";
import { Accessories } from '../utils/accessories';

export class PurchasedProducts {
    id: number;
    product : Products;
    quantity: number;

    constructor(purchasedProducts ? : any) {
        if(purchasedProducts){
            this.id = purchasedProducts._id;
            this.product = Accessories.mapModelObject(purchasedProducts.product, 'products');
            this.quantity = purchasedProducts.quantity;
        }
    }
}