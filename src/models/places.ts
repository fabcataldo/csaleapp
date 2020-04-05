import { Tickets } from "./tickets";
import { Comments } from "./comments";

export class Places {
    _id: string;
    name : string;
    address : string;
    number_of_people_enabled : number;
    lat: number;
    lng: number;
    tickets: [Tickets];
    comments: [Comments];

   constructor(place ? : any) {
    if(place)
        this._id = place._id ? place._id : null;
        this.name = place.name ? place.name : '';
        this.lat = place.lat ? place.lat : '';
        this.lng = place.lng ? place.lng : '';
        this.address = place.address ? place.address : '';
        this.number_of_people_enabled = place.number_of_people_enabled ? place.number_of_people_enabled : 0;
        this.tickets = place.tickets ? place.tickets : null;
        this.comments = place.comments ? place.comments : null;
   }
}