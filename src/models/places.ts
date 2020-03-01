export class Places {
    name = String;
    address = String;
    numberOfPeopleEnabled = Number;
   constructor(name?, address?, numberOfPeopleEnabled?) {
       name = name ? name : '';
       address = address ? address : '';
       numberOfPeopleEnabled = numberOfPeopleEnabled ? numberOfPeopleEnabled : 0;
   }
}