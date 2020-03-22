export class PaymentMethods {
    _id : string;
    name : string;
    amountPaid : number;

    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this._id = paymentMethod._id;
            this.name = paymentMethod.name;
            this.amountPaid = paymentMethod.amountPaid;
        }
    }
}