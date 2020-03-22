export class Privileges {
    _id : string;
    name : string;
    description : string;

    constructor(privilege ? : any) {
    if(privilege){
        this._id = privilege._id ? privilege._id : null;
        this.name = privilege.name ? privilege.name : '';
        this.description = privilege.description ? privilege.description : '';
    }
}