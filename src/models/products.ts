import { Places } from './places';

export class Products {
    _id : string;
    description : string;
    price : number;
    quantity : number;

    constructor(product ? : any) {
        if (product) {
            this._id = product._id ? product._id : null;
            this.description = product.description ? product.description : '';
            this.price = product.price ? product.price : 0;
            this.quantity = product.quantity ? product.quantity : 0;
        }
    }
}
