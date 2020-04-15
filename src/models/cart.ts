
import { Places } from "./places";
import { Tickets } from "./tickets";

export class Cart{
    private _ticket: Tickets;
    private _place: Places;

    constructor(cart ? : any){
        if(cart){
            this.place = cart.place ? cart.place : cart._place ? cart._place : null;
            this.ticket = cart.ticket ? cart.ticket : cart._ticket ? cart._ticket : null;
        }
    }

    set ticket(ticket){
        this._ticket = ticket;
    }
    set place(place){
        this._place = place;
    }

    get ticket(){
        return this._ticket;
    }
    get place(){
        return this._place;
    }
}