export class Comments {
   _id : string;
   comment : string;
   qualification : number;

   constructor(comment ? : any) {
      if(comment){
        this._id = comment._id ? comment._id : null;
        this.comment = comment.comment ? comment.comment : '';
        this.qualification = comment.qualification ? comment.qualification : 0;
      }
   }
}
