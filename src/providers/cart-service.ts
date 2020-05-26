import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { PlacesServiceProvider } from './places-service';
import { UserServiceProvider } from './user-service';
import { TicketsServiceProvider } from './tickets-service';
import { PaymentMethodsServiceProvider } from './payment-methods';
import { PurchasedProductsServiceProvider } from './purchased-products-service';

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
        this.cart.ticket.payment_methods.forEach(item => {
          total+=Number(item.amount_paid);
        })
        return total;
    }

    findPaymentMethod(paymentMethod, type){
        if(type == 'cash'){
            return this.cart.ticket.payment_methods.findIndex(item=>{
                return 'efectivo' == item.payment_method.name
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
            this.cart.ticket.payment_methods[paymentIdx].amount_paid = paymentMethod.amount_paid;
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

    saveLastTicket(idTicketSaved){
        this.TicketSrv.getTicket(idTicketSaved).subscribe(resp=>{
            this.getCart().ticket = resp;
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo Tickets')
            console.log(err);
        };
    }

    saveNewData(){   
        let userStored = JSON.parse(localStorage.getItem('user'))
        if(userStored.tickets)
            userStored.tickets.push(this.getCart().ticket) 
        else
            userStored.tickets = [this.getCart().ticket] 
        localStorage.setItem('user', JSON.stringify(userStored));

        this.UserSrv.putUser(userStored._id, userStored).subscribe(resp2=>{
            console.log(resp2)
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo USERS')
            console.log(err);
        }

        if(this.getCart().place.tickets)
            this.getCart().place.tickets.push(this.getCart().ticket) 
        else
            this.getCart().place.tickets= [this.getCart().ticket]
        
        this.PlaceSrv.putPlace(this.getCart().place._id, this.getCart().place).subscribe(resp=>{
            console.log(resp)
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo Places')
            console.log(err);
        }
        localStorage.removeItem('cart');
    }

    uploadCart(){
        let savedPurchasedProducts=[];
        let savedPaymentMethods=[];
        let idTicketSaved;
        
        this.getCart().ticket.purchased_products.forEach((purchasedProducts)=>{
            let newPurchasedProducts={
                _id: purchasedProducts.id, product: purchasedProducts.product._id,
                quantity: purchasedProducts.quantity
            }
            this.PurchasedProductsSrv.postPurchasedProducts(newPurchasedProducts).subscribe((resp3)=>{
                savedPurchasedProducts.push(resp3);
                console.log(savedPurchasedProducts)
            }),
            (err)=>{
                console.log('ERROR al guardar ticket: Modelo PAYMENT METHODS')
                console.log(err);
            }
        })
        console.log(savedPurchasedProducts)
        this.getCart().ticket.purchased_products = savedPurchasedProducts;
        

        this.getCart().ticket.payment_methods.forEach((paymentMethod)=>{
            let newPaymentMethod={
                _id: paymentMethod.id, card: paymentMethod.card,
                payment_method: paymentMethod.payment_method.id, amount_paid: paymentMethod.amount_paid
            }
            this.PaymentMethodSrv.postPaymentMethod(newPaymentMethod).subscribe((resp3)=>{
                savedPaymentMethods.push(resp3);
            }),
            (err)=>{
                console.log('ERROR al guardar ticket: Modelo PAYMENT METHODS')
                console.log(paymentMethod)
                console.log(err);
            }
        })
        console.log(savedPaymentMethods)
        this.getCart().ticket.payment_methods = savedPaymentMethods;

        
        this.TicketSrv.postTicket(this.getCart().ticket).subscribe(resp=>{
            console.log('postTicket resp: \n'+resp);
            idTicketSaved = resp._id

            this.saveLastTicket(idTicketSaved);
        }),
        (err)=>{
            console.log('ERROR al guardar ticket: Modelo Tickets')
            console.log(err);
        };
        
    }
}
