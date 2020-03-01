export class PaymentMethods {
    name = String;
    amountPaid = Number;
    constructor(name?, amountPaid?) {
        name = name ? name : '';
        amountPaid = amountPaid ? amountPaid : 0;
    }
}