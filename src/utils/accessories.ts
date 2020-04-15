import { Products } from "../models/products";
import { PaymentMethods } from "../models/payment_methods";
import { Tickets } from "../models/tickets";
import { Comments } from "../models/comments";
import { PurchasedProducts } from "../models/purchased_products";

export class Accessories{
    static formatDate(date){
        var tmp = new Date(date)
        return tmp.getDate()+'/'+(tmp.getMonth()+1)+'/'+tmp.getFullYear()+' '+tmp.getHours()+':'+tmp.getMinutes()+':'+tmp.getSeconds();
    }

    static mapModelArray(array, model){
        if(model==='products')
            return array.map((item)=> new Products(item));
        if(model==='tickets')
            return array.map((item)=> new Tickets(item));
        if(model==='payment_methods')
            return array.map((item)=> new PaymentMethods(item));
        if(model==='comments')
            return array.map((item)=> new Comments(item));
        if(model==='purchased_products')
            return array.map((item)=> new PurchasedProducts(item));
    }

    static mapModelObject(object, model){
        if(model==='products')
            return new Products(object)
    }

    static capitalizeFirstChar(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}