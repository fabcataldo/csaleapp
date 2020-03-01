export class Privileges {
    name = String;
    description = String;

    constructor(name, description) {
        name = name ? name : '';
        description = description ? description : '';
    }
}