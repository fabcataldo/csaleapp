import { Users } from './users';
import { Places } from './places';
import { Products } from './products';
import { PaymentMethods } from './payment_methods';

export class Tickets {
    _id : string;
    dateOfPurchase : Date;
    user : Users;
    products : Products;
    paymentMethods : [PaymentMethods];
    validDateFrom : Date;
    validDateTo : Date;
    total : Number;

    constructor(ticket ? : any) {
        this._id = ticket._id ? ticket._id : null;
        this.dateOfPurchase = ticket.date_of_purchase ? new Date(ticket.date_of_purchase) : new Date();
        this.products = ticket.products ? ticket.products : new Products();
        this.paymentMethods = ticket.payment_methods ? ticket.payment_methods : new PaymentMethods();
        this.validDateFrom = ticket.valid_date_from ? new Date(ticket.valid_date_from) : new Date();
        this.validDateTo = ticket.valid_date_to ? new Date(ticket.valid_date_to) : new Date();
        this.total = ticket.total ? ticket.total : 0;
    }
}