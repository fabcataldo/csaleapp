import { Users } from './users';
import { Places } from './places';

export class Comments {
   comment = String;
   qualification = Number;
   user = Users;
   place = Places;
   constructor(comment?, qualification?, user?, place?) {
        comment = comment ? comment : '';
        qualification = qualification ? qualification : 0;
        user = user ? user : new Users();
        place = place ? place : new Places();
   }
}
