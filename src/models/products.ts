import { Places } from './places';

export class Products {
    description = String;
    price = Number;
    place = Places;
    constructor(description?, price?, place?) {
        description = description ? description : '';
        price = price ? price : 0;
        place = place ? place : new Places();
    }
}
