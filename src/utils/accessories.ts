import { Products } from "../models/products";
import { PaymentMethods } from "../models/payment_methods";
import { Tickets } from "../models/tickets";
import { Comments } from "../models/comments";
import { PurchasedProducts } from "../models/purchased_products";
import { AbstractControl } from "@angular/forms";


export class Accessories{
    static formatDate(date){
        var tmp = new Date(date)
        return tmp.getDay()+'/'+(tmp.getMonth()+1)+'/'+tmp.getFullYear()+' '+tmp.getHours()+':'+tmp.getMinutes()+':'+tmp.getSeconds();
    }

    static mapModelArray(array, model){
        if(model==='products')
            return array.map((item)=> new Products(item));
        if(model==='tickets')
            return array.map((item)=> new Tickets(item));

        if(model==='comments')
            return array.map((item)=> new Comments(item));
        if(model==='purchased_products')
            return array.map((item)=> new PurchasedProducts(item));
    }

    static mapModelObject(object, model):any{
        if(model==='products')
            return new Products(object)
        if(model==='payment_methods')
            return new PaymentMethods(object);
    }

    static toCorrectDate(string){
        let date = new Date(string);
        let monthDate = date.getMonth().toString().length < 2 ? '0'+date.getMonth() : date.getMonth();
        return date.getDate()+'/'+monthDate+'/'+date.getFullYear()+' '+date.getHours()+date.getMinutes();
    }

    static capitalizeFirstChar(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //validador de números de tarjeta
    static cardValidator(control: AbstractControl): {[key: string]: boolean} | null{
        let cards = {
            'mc': '5[1-5][0-9]{14}',
            'ec': '5[1-5][0-9]{14}',
            'vi': '4(?:[0-9]{12}|[0-9]{15})',
            'ax': '3[47][0-9]{13}',
            'dc': '3(?:0[0-5][0-9]{11}|[68][0-9]{12})',
            'bl': '3(?:0[0-5][0-9]{11}|[68][0-9]{12})',
            'di': '6011[0-9]{12}',
            'jcb': '(?:3[0-9]{15}|(2131|1800)[0-9]{11})',
            'er': '2(?:014|149)[0-9]{11}'
        };
        let value = String(control.value).replace(/[- ]/g, ''); //ignore dashes and whitespaces

        var cardinfo = cards, results = [];
        /*
        if(ccType){
                var expr = '^' + cardinfo[ccType.toLowerCase()] + '$';
                return expr ? !!value.match(expr) : false; // boolean
        }
         */

        for (var p in cardinfo) {
            if (value.match('^' + cardinfo[p] + '$')) {
                results.push(p);
            }
        }
        return results.length ? { validCard: true } : null;
    };
}