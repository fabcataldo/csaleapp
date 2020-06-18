export class AvailablePaymentMethods {
    _id: string;
    name : string;
    
    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this._id = paymentMethod._id;
            this.name = paymentMethod.name;
        }
    }
}