export class AvailablePaymentMethods {
    id: string;
    name : string;
    
    constructor(paymentMethod ? : any) {
        if(paymentMethod){
            this.id = paymentMethod._id;
            this.name = paymentMethod.name;
        }
    }
}