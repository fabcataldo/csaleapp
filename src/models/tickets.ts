import { Users } from './users';
import { PaymentMethods } from './payment_methods';
import { Accessories } from '../utils/accessories';
import { PurchasedProducts } from './purchased_products';

export class Tickets {
    _id : string = "0";
    dateOfPurchase : string = "";
    user : Users = null;
    paymentMethods : PaymentMethods[] = [];
    total : number = 0;
    purchasedProducts: PurchasedProducts[] = [];

    constructor(ticket ? : any) {
        if(ticket){
            this._id = ticket._id ? ticket._id : null;
            this.dateOfPurchase = ticket.date_of_purchase ? Accessories.formatDate(ticket.date_of_purchase) : Accessories.formatDate(new Date().toISOString());
            this.paymentMethods = ticket.payment_methods ? Accessories.mapModelArray(ticket.payment_methods, 'payment_methods') : null;
            this.total = ticket.total ? ticket.total : 0;
            this.purchasedProducts = ticket.purchased_products ? Accessories.mapModelArray(ticket.purchased_products, 'purchased_products') : null;
        }
    }
}