import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Cards } from '../../models/cards';
import { Cart } from '../../models/cart';
import { CartServiceProvider } from '../../providers/cart-service';
import { PaymentMethods } from '../../models/payment_methods';
import { Accessories} from '../../utils/accessories';
import { ShoppingCheckoutPage } from '../shopping-checkout/shopping-checkout';

/**
 * Generated class for the ShoppingCardPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-card-payment',
  templateUrl: 'shopping-card-payment.html',
})
export class ShoppingCardPaymentPage {
  cardForm: FormGroup;
  cart: Cart;
  card: PaymentMethods;
  remainingAmount: number=0;
  payment: PaymentMethods;
  canPay: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, private cartSrv: CartServiceProvider) {
    this.cardForm = this.formBuilder.group({
      card_number: ['', Validators.compose([Validators.required, Accessories.cardValidator])],
      user_dni: ['', Validators.compose([Validators.required])],
      user_name: ['', Validators.compose([Validators.required])],
      security_code: ['', Validators.compose([Validators.required, Validators.maxLength(3)])],
      expiration_date: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
    })
    this.getFormFields()['user_name'].setValue(JSON.parse(localStorage.getItem('user')).name)
    this.cart = this.cartSrv.getCart();
    
    this.card = this.navParams.get('paymentMethod');

    this.payment = this.navParams.get('cardPayment');
    if(this.payment)
      this.setFormValues()
    
    this.remainingAmount = this.cartSrv.getRemainingAmount();
    this.formControlsChange();
  }

  setFormValues(){
    this.getFormFields()['card_number'].setValue(this.payment.card.card_number);
    this.getFormFields()['user_dni'].setValue(this.payment.card.user_dni);
    this.getFormFields()['user_name'].setValue(this.payment.card.user_name);
    this.getFormFields()['security_code'].setValue(this.payment.card.security_code);
    this.getFormFields()['expiration_date'].setValue(this.payment.card.expiration_date);
    this.getFormFields()['amount'].setValue(this.payment.amountPaid);
  }

  formControlsChange(){
    const amountControl = this.cardForm.get('amount');
    amountControl.valueChanges.subscribe((value)=>{
        let amount = parseInt(value);
        
        if(isNaN(amount)){
          amount = 0;
        }
        
        if(this.payment){
          this.remainingAmount = (this.cartSrv.getRemainingAmount() + this.payment.amountPaid) - amount
        }
        else{
          this.remainingAmount = this.cartSrv.getRemainingAmount() - amount
        }
        this.canPay = this.remainingAmount >= 0 && this.remainingAmount <= this.cartSrv.getRemainingAmount() ? true : false;

        amountControl.clearValidators();
        amountControl.setValidators(Validators.compose([Validators.required]))
    })

    const cardNumberControl = this.cardForm.get('card_number');
    cardNumberControl.valueChanges.subscribe((value)=>{
      if(value.length>0){
        cardNumberControl.clearValidators();
        cardNumberControl.setValidators(Validators.compose([Validators.required, Accessories.cardValidator]))
      }
    })
  }

  ionViewDidLoad() {
  }

  getFormFields() { return this.cardForm.controls; }

  onClickSubmit(data){
    let newCard = new Cards({
      _id: null, 
      card_number: data.card_number,
      user_dni: data.user_dni,
      user_name: data.user_name, 
      expiration_date: data.expiration_date,
      security_code: data.security_code
    });

    let newPaymentMethod = new PaymentMethods(
      {
        id: null,
        paymentMethod: this.card,
        card: newCard,
        amountPaid: data.amount
      }
    )
    this.cartSrv.savePaymentMethod(newPaymentMethod, 'card');
    this.cartSrv.setCart(this.cartSrv.getCart());
    this.navCtrl.push(ShoppingCheckoutPage);
  }
}
