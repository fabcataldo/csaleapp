import { Users } from './users';
import { Products } from './products';
import { PaymentMethods } from './payment_methods';
import { Accessories } from '../utils/accessories';

export class Tickets {
    _id : string;
    dateOfPurchase : string;
    user : Users;
    products : Products;
    paymentMethods : [PaymentMethods];
    validDateFrom : string;
    validDateTo : string;
    total : Number;

    constructor(ticket ? : any) {
        this._id = ticket._id ? ticket._id : null;
        this.dateOfPurchase = ticket.date_of_purchase ? Accessories.formatDate(ticket.date_of_purchase) : Accessories.formatDate(new Date().toISOString());
        this.products = ticket.products ? Accessories.mapModelArray(ticket.products, 'products') : null;
        this.paymentMethods = ticket.payment_methods ? Accessories.mapModelArray(ticket.payment_methods, 'payment_methods') : null;
        this.validDateFrom = ticket.valid_date_from ? Accessories.formatDate(ticket.valid_date_from) : Accessories.formatDate(new Date().toISOString());
        this.validDateTo = ticket.valid_date_to ? Accessories.formatDate(ticket.valid_date_to) : Accessories.formatDate(new Date().toISOString());
        this.total = ticket.total ? ticket.total : 0;
    }
}