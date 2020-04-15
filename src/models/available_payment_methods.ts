export class AvailablePaymentMethods {
    name : string;
    
    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this.name = paymentMethod.name;
        }
    }
}