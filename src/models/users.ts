import { Roles } from './roles';

export class Users {
    name = String;
    surname = String;
    email = String;
    password = String;
    role = Roles;

    constructor(name?, surname?, email?, password?, role?) {
        name = name ? name : '';
        surname = surname ? surname : '';
        email = email ? email : '';
        password = password ? password : '';
        role = role ? role : new Roles();
    }
}