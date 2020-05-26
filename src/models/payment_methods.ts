import { AvailablePaymentMethods } from "./available_payment_methods";
import { Cards } from "./cards";

export class PaymentMethods {
    id: string;
    amount_paid: number;
    payment_method : AvailablePaymentMethods;
    card: Cards;

    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this.id = paymentMethod.id ? paymentMethod.id : paymentMethod._id ? paymentMethod._id : null;
            this.payment_method = paymentMethod.payment_method ? paymentMethod.payment_method : null;
            this.card = paymentMethod.card ? paymentMethod.card : null;
            this.amount_paid = paymentMethod.amount_paid ? paymentMethod.amount_paid : 0;
        }
    }
}