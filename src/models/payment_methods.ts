export class PaymentMethods {
    name : string;
    amountPaid : number;

    constructor(paymentMethod ? : any) {
        console.log(paymentMethod)
        if(paymentMethod){
            this.name = paymentMethod.name;
            this.amountPaid = paymentMethod.amount_paid;
        }
    }
}