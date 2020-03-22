import { Places } from './places';

export class Products {
    _id : string;
    description : string;
    price : number;
    place : Places;

    constructor(product ? : any) {
        if (product) {
            this._id = product._id ? product._id : null;
            this.description = product.description ? product.description : '';
            this.price = product.price ? product.price : 0;
            this.place = product.place ? product.place : new Places();
        }
    }
}
