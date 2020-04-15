import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';

@Injectable()
export class CartServiceProvider {
    private cart: Cart;

    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    
    getCart(){
        return this.cart;
    }

    setCart(cart){
        this.cart = cart;
        this.storeCurrentCart();
    }

    storeCurrentCart(){
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}
