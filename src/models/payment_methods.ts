import { AvailablePaymentMethods } from "./available_payment_methods";
import { Cards } from "./cards";

export class PaymentMethods {
    id: string;
    amountPaid: number;
    paymentMethod : AvailablePaymentMethods;
    card: Cards;

    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this.id = paymentMethod.id ? paymentMethod.id : paymentMethod._id ? paymentMethod._id : null;
            this.paymentMethod = paymentMethod.paymentMethod ? paymentMethod.paymentMethod : paymentMethod.payment_method ? paymentMethod.payment_method : null;
            this.card = paymentMethod.card ? paymentMethod.card : null;
            this.amountPaid = paymentMethod.amountPaid ? paymentMethod.amountPaid : paymentMethod.amount_paid ? paymentMethod.amount_paid : 0;
        }
    }
}