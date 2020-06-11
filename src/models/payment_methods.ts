import { AvailablePaymentMethods } from "./available_payment_methods";

export class PaymentMethods {
    _id: string;
    amount_paid: number;
    payment_method : AvailablePaymentMethods;

    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this._id = paymentMethod._id ? paymentMethod._id : null;
            this.payment_method = paymentMethod.payment_method ? paymentMethod.payment_method : null;
            this.amount_paid = paymentMethod.amount_paid ? paymentMethod.amount_paid : 0;
        }
    }
}