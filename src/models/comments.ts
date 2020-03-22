import { Users } from './users';
import { Places } from './places';

export class Comments {
   _id : string;
   comment : string;
   qualification : number;
   user : Users;
   place : Places;

   constructor(comment ? : any) {
      if(comment){
        this._id = comment._id ? comment._id : null;
        this.comment = comment.comment ? comment.comment : '';
        this.qualification = comment.qualification ? comment.qualification : 0;
        this.user = comment.user ? comment.user : new Users();
        this.place = comment.place ? comment.place : new Places();
      }
   }
}
