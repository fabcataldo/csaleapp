import { Users } from './users';
import { Places } from './places';
import { Products } from './products';
import { PaymentMethods } from './payment_methods';

export class Tickets {
    dateOfPurchase = Date;
    place = Places;
    user = Users;
    products = Products;
    paymentMethods = [PaymentMethods];
    validDateFrom = Date;
    validDateTo = Date;
    constructor(dateOfPurchase?, place?, user?, products?, paymentMethods?, validDateFrom?, validDateTo?) {
        dateOfPurchase = dateOfPurchase ? dateOfPurchase : new Date();
        place = place ? place : new Places();
        user = user ? user : new Users();
        products = products ? products : new Products();
        paymentMethods = paymentMethods ? paymentMethods : new PaymentMethods();
        validDateFrom = validDateFrom ? validDateFrom : new Date();
        validDateTo = validDateTo ? validDateTo : new Date();
    }
}