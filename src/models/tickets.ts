import { Users } from './users';
import { Places } from './places';
import { Products } from './products';
import { PaymentMethods } from './payment_methods';

export class Tickets {
    _id : string;
    dateOfPurchase : Date;
    place : Places;
    user : Users;
    products : Products;
    paymentMethods : [PaymentMethods];
    validDateFrom : Date;
    validDateTo : Date;

    constructor(ticket ? : any) {
        this._id = ticket._id ? ticket._id : null;
        this.dateOfPurchase = ticket.dateOfPurchase ? ticket.dateOfPurchase : new Date();
        this.place = ticket.place ? ticket.place : new Places();
        this.user = ticket.user ? ticket.user : new Users();
        this.products = ticket.products ? ticket.products : new Products();
        this.paymentMethods = ticket.paymentMethods ? ticket.paymentMethods : new PaymentMethods();
        this.validDateFrom = ticket.validDateFrom ? ticket.validDateFrom : new Date();
        this.validDateTo = ticket.validDateTo ? ticket.validDateTo : new Date();
    }
}