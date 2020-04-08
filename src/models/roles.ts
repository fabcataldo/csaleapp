import { Privileges } from './privileges';

export class Roles {
    _id : string;
    name : string;
    privileges : Privileges[];
    constructor(role?: any) {
        if (role) {
            this._id = role._id;
            this.name = role.name;
            this.privileges = role.privileges;
        }
    }
}