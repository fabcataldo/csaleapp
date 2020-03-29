export class PaymentMethods {
    name : string;
    amountPaid : number;

    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this.name = paymentMethod.name;
            this.amountPaid = paymentMethod.amountPaid;
        }
    }
}