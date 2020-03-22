export class Places {
    _id: string;
    name : string;
    address : string;
    number_of_people_enabled : number;

   constructor(place ? : any) {
    if(place)
       this._id = place._id ? place._id : null;
       this.name = place.name ? place.name : '';
       this.address = place.address ? place.address : '';
       this.number_of_people_enabled = place.number_of_people_enabled ? place.number_of_people_enabled : 0;
   }
}