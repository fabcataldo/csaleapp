
import { Accessories } from '../utils/accessories';

export class Products {
    _id : string;
    description : string;
    price : number;
    valid_date_from : string;
    valid_date_to : string;

    constructor(product ? : any) {
        if (product) {
            this._id = product._id ? product._id : null;
            this.description = product.description ? product.description : '';
            this.price = product.price ? product.price : 0;
            this.valid_date_from = product.valid_date_from ? Accessories.formatDate(product.valid_date_from) : Accessories.formatDate(new Date().toISOString());
            this.valid_date_to = product.valid_date_to ? Accessories.formatDate(product.valid_date_to) : Accessories.formatDate(new Date().toISOString());
        }
    }
}
