import { Privileges } from './privileges';

export class Roles {
    name = String;
    privileges = [Privileges];
    constructor(name?, privileges?) {
        name = name ? name : '';
        privileges = privileges ? privileges : [];
    }
}