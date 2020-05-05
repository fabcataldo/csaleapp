import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { PlacesServiceProvider } from './places-service';
import { UserServiceProvider } from './user-service';
import { TicketsServiceProvider } from './tickets-service';
import { PaymentMethodsServiceProvider } from './payment-methods';

@Injectable()
export class CartServiceProvider {
    private cart: Cart;

    constructor(private PlaceSrv: PlacesServiceProvider, private UserSrv: UserServiceProvider,
        private TicketSrv: TicketsServiceProvider, private PaymentMethodSrv: PaymentMethodsServiceProvider) {
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
        this.cart.ticket.payment_methods.forEach(item => {
          total+=Number(item.amountPaid);
        })
        return total;
    }

    findPaymentMethod(paymentMethod, type){
        if(type == 'cash'){
            return this.cart.ticket.payment_methods.findIndex(item=>{
                return 'efectivo' == item.paymentMethod.name
            })
        }
        if(type == 'card'){
            return this.cart.ticket.payment_methods.findIndex(item=>{
                if(item.card){
                    return paymentMethod.card.card_number == item.card.card_number
                }
            })
        }
    }

    savePaymentMethod(paymentMethod, type){
        let paymentIdx = this.findPaymentMethod(paymentMethod, type);
        if(paymentIdx !== -1){
            this.cart.ticket.payment_methods[paymentIdx].amountPaid = paymentMethod.amountPaid;
        }
        else{
            this.cart.ticket.payment_methods.push(paymentMethod);
        }
    }

    removePaymentMethod(paymentMethod, type){
        let paymentIdx = this.findPaymentMethod(paymentMethod, type);
        if(paymentIdx !== -1){
            this.cart.ticket.payment_methods.splice(paymentIdx, 1);
        }
        console.log(this.cart.ticket.payment_methods)
    }

    uploadCart(){
        this.getCart().place.tickets.push(this.getCart().ticket);
        
        let userStored = JSON.parse(localStorage.getItem('user'))
        if(userStored.tickets)
            userStored.tickets.push(this.getCart().ticket) 
        else
            userStored.tickets = [this.getCart().ticket] 
            
        
        localStorage.setItem('user', JSON.stringify(userStored));

        this.TicketSrv.postTicket(this.getCart().ticket).subscribe(resp=>{
            console.log('postTicket resp: \n'+resp);
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo Tickets')
            console.log(err);
        };

        this.PlaceSrv.putPlace(this.getCart().place._id, this.getCart().place).subscribe(resp=>{
            console.log(resp)
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo Places')
            console.log(err);
        }
        this.UserSrv.putUser(userStored._id, userStored).subscribe(resp2=>{
            console.log(resp2)
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo USERS')
            console.log(err);
        }
        this.getCart().ticket.payment_methods.forEach((paymentMethod)=>{
            this.PaymentMethodSrv.postPaymentMethod(paymentMethod).subscribe((resp3)=>{
                console.log(resp3)
            }),
            (err)=>{
                console.log('ERROR al guardar ticket: Modelo PAYMENT METHODS')
                console.log(err);
            }
        })


        localStorage.removeItem('cart');
    }
}
