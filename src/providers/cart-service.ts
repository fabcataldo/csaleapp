import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { PlacesServiceProvider } from './places-service';
import { UserServiceProvider } from './user-service';
import { TicketsServiceProvider } from './tickets-service';
import { PaymentMethodsServiceProvider } from './payment-methods';
import { PurchasedProductsServiceProvider } from './purchased-products-service';
import { Tickets } from '../models/tickets';
import { PurchasedProducts } from '../models/purchased_products';
import { PaymentMethods } from '../models/payment_methods';
import { Observable, forkJoin } from 'rxjs';

@Injectable()
export class CartServiceProvider {
    private cart: Cart;

    constructor(private PlaceSrv: PlacesServiceProvider, private UserSrv: UserServiceProvider,
        private TicketSrv: TicketsServiceProvider, private PaymentMethodSrv: PaymentMethodsServiceProvider,
        private PurchasedProductsSrv: PurchasedProductsServiceProvider) {
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

    getRemainingAmount(){
        return this.cart.ticket.total - this.getTotalPaid();
    }
    
    getTotalPaid(){
        let total = 0;
        total+=this.cart.ticket.payment_methods ? Number(this.cart.ticket.payment_methods.amount_paid) : 0;
        return total;
    }

    savePaymentMethod(paymentMethod){
        this.cart.ticket.payment_methods = paymentMethod;
    }

    async saveNewData(){
        let userStored = JSON.parse(localStorage.getItem('user'))
        if(userStored.tickets)
            userStored.tickets.push(this.cart.ticket) 
        else
            userStored.tickets = [this.cart.ticket];
        localStorage.setItem('user', JSON.stringify(userStored));

        if(this.getCart().place.tickets)
            this.getCart().place.tickets.push(this.cart.ticket) 
        else
            this.getCart().place.tickets = [this.cart.ticket]

        await this.UserSrv.putUser(userStored._id, userStored).subscribe(resp2=>{
            console.log(resp2)
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo USERS')
            console.log(err);
        }
        await this.PlaceSrv.putPlace(this.getCart().place._id, this.getCart().place).subscribe(resp=>{
            console.log(resp)
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo Places')
            console.log(err);
        }
        localStorage.removeItem('cart');
    }


    async uploadCart(){
        this.getCart().ticket.purchased_products.forEach(async (purchasedProducts, index)=>{
            let newPurchasedProducts={
                _id: purchasedProducts._id, product: purchasedProducts.product._id,
                quantity: purchasedProducts.quantity
            }
            await this.PurchasedProductsSrv.postPurchasedProducts(newPurchasedProducts).subscribe((resp3)=>{
                this.cart.ticket.purchased_products[index]._id = resp3._id;

            }),
            (err)=>{
                console.log('ERROR al guardar ticket: Modelo PAYMENT METHODS')
                console.log(err);
            }
        })

        await this.PaymentMethodSrv.postPaymentMethod(this.cart.ticket.payment_methods[0]).subscribe((resp3) => {
            this.cart.ticket.payment_methods._id = resp3._id;
        }),
        (err) => {
            console.log('ERROR al guardar ticket: Modelo PAYMENT METHODS')
            console.log(err);
        }

        localStorage.setItem('cart', JSON.stringify(this.cart))

    }

    async asyncTicketUpload(){
        await this.TicketSrv.postTicket(this.cart.ticket).subscribe(async resp=>{
            this.cart.ticket = resp;
            this.saveNewData();
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo Tickets')
            console.log(err);
        };
    }    
}
