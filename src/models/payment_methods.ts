import { AvailablePaymentMethods } from "./available_payment_methods";

export class PaymentMethods {
    amountPaid: number;
    paymentMethod : AvailablePaymentMethods;
    creditCard: string;

    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this.paymentMethod = paymentMethod.payment_method;
            this.creditCard = paymentMethod.credit_card;
            this.amountPaid = paymentMethod.amount_paid;
        }
    }
}