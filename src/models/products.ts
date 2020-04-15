
import { Accessories } from '../utils/accessories';

export class Products {
    _id : string;
    description : string;
    price : number;
    validDateFrom : string;
    validDateTo : string;

    constructor(product ? : any) {
        if (product) {
            this._id = product._id ? product._id : null;
            this.description = product.description ? product.description : '';
            this.price = product.price ? product.price : 0;
            this.validDateFrom = product.valid_date_from ? Accessories.formatDate(product.valid_date_from) : Accessories.formatDate(new Date().toISOString());
            this.validDateTo = product.valid_date_to ? Accessories.formatDate(product.valid_date_to) : Accessories.formatDate(new Date().toISOString());
        }
    }
}
