export class Cards {
    _id : string;
    card_number : string;
    user_dni : string;
    user_name : string;
    security_code : number;
    expiration_date: string;

    constructor(card ? : any) {
        if (card) {
            this._id = card._id ? card._id : null;
            this.card_number = card.card_number ? card.card_number : '';
            this.user_dni = card.user_dni ? card.user_dni : '';
            this.user_name = card.user_dni ? card.card_number : '';
            this.expiration_date = card.expiration_date ? card.expiration_date : '';
            this.security_code = card.security_code ? card.security_code : 0;
        }
    }
}
