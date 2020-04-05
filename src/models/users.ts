import { Roles } from './roles';
import { Tickets } from './tickets';
import { Comments } from './comments';

export class Users {
    _id : string;
    name : string;
    surname : string;
    email : string;
    password : string;
    role : Roles;
    tickets : [Tickets];
    comments: [Comments];

    constructor(user ? : any) {
        this._id = user._id ? user._id : null;
        this.name = user.name ? user.name : '';
        this.surname = user.surname ? user.surname : '';
        this.email = user.email ? user.email : '';
        this.password = user.password ? user.password : '';
        this.role = user.role ? user.role : new Roles();
        this.tickets = user.tickets ? user.tickets : null;
        this.comments = user.comments ? user.comments : null;
    }
}