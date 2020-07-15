import { PaymentMethods } from './payment_methods';
import { Accessories } from '../utils/accessories';
import { PurchasedProducts } from './purchased_products';

export class Tickets {
    _id : string = null;
    date_of_purchase : string = "";
    payment_methods : PaymentMethods;
    total : number = 0;
    purchased_products: PurchasedProducts[] = [];
    unique_code: number = 0;

    constructor(ticket ? : any) {
        if(ticket){
            this._id = ticket._id ? ticket._id : null;
            this.date_of_purchase = ticket.date_of_purchase ? ticket.date_of_purchase : new Date().toISOString();
            this.payment_methods = ticket.payment_methods ? Accessories.mapModelObject(ticket.payment_methods, 'payment_methods') : null;
            this.total = ticket.total ? ticket.total : 0;
            this.purchased_products = ticket.purchased_products ? Accessories.mapModelArray(ticket.purchased_products, 'purchased_products') : null;
            this.unique_code = ticket.unique_code ? ticket.unique_code : 0;
        }
    }
}