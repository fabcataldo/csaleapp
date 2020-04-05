import { Roles } from './roles';
import { Tickets } from './tickets';
import { Comments } from './comments';
import { Accessories } from '../utils/accessories';

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
        this.role = user.role ? new Roles(user.role) : null;
        this.tickets = user.tickets ? Accessories.mapModelArray(user.tickets, 'tickets') : null;
        this.comments = user.comments ? Accessories.mapModelArray(user.comments, 'comments') : null;
    }
}