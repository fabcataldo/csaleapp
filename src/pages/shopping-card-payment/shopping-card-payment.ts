import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Cards } from '../../models/cards';
import { Cart } from '../../models/cart';
import { CartServiceProvider } from '../../providers/cart-service';
import { PaymentMethods } from '../../models/payment_methods';
import { Accessories} from '../../utils/accessories';
import { ShoppingCheckoutPage } from '../shopping-checkout/shopping-checkout';
import { PaymentMethodsServiceProvider } from '../../providers/payment-methods';
import { NotificationsProvider } from '../../providers/notifications-service';

/**
 * Generated class for the ShoppingCardPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var Mercadopago: any;

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
  isMercadopago: boolean;
  mercadopagoData: [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, private cartSrv: CartServiceProvider,
    private PaymentMethodSrv: PaymentMethodsServiceProvider,
    private NotificationsCtrl: NotificationsProvider) {
    
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
    Mercadopago.setPublishableKey("TEST-29ec7fdc-602d-4241-bb97-e94a7dfa7b11")
    console.log('DNISSS : ',Mercadopago.getIdentificationTypes())
    this.isMercadopago = this.navParams.get('isMercadopago')

    this.card = this.navParams.get('paymentMethod');

    this.payment = this.navParams.get('cardPayment') ? this.navParams.get('cardPayment') : this.navParams.get('mercadoPagoPayment') ? this.navParams.get('mercadoPagoPayment') : null ;
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
    this.getFormFields()['amount'].setValue(this.payment.amount_paid);
  }

  formControlsChange(){
    const amountControl = this.cardForm.get('amount');
    amountControl.valueChanges.subscribe((value)=>{
        let amount = parseInt(value);
        
        if(isNaN(amount)){
          amount = 0;
        }
        
        if(this.payment){
          this.remainingAmount = (this.cartSrv.getRemainingAmount() + Number(this.payment.amount_paid)) - amount
        }
        else{
          this.remainingAmount = this.cartSrv.getRemainingAmount() - amount
        }
        this.canPay = this.remainingAmount >= 0 && this.remainingAmount <= this.cart.ticket.total ? true : false;
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

  payWithMercadopago(card){
    console.log('ES CON MERCADO PAGO')
      var respuesta = Mercadopago.createToken({
        "cardNumber" : card.card_number,
        "securityCode" : card.security_code ,
        "cardExpirationMonth" : '11' ,
        "cardExpirationYear" : '25',
        "cardholderName" : 'Pepe Argento',
        "docType": 'DNI',
        "docNumber": '38914652',
        "installments": 1
      }, this.sdkResponseHandler.bind(this));
      console.log('RESPUESTA: '+respuesta);
  }

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
        payment_method: this.card,
        card: newCard,
        amount_paid: data.amount
      }
    )
    if(this.isMercadopago){
      this.payWithMercadopago(newCard);
    }
    this.cartSrv.savePaymentMethod(newPaymentMethod, 'card');
    this.cartSrv.setCart(this.cartSrv.getCart());

    this.navCtrl.push(ShoppingCheckoutPage);
  }

  sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        console.log("verify filled data");
    }else{
      console.log(this.cardForm)
      let mercadopagoData = {
        token: response.id,
        description: 'pago de compra CSaleApp; monto: , '+parseInt(this.cardForm.controls.amount.value),
        payment_method_id: 'visa',
        payer_email: JSON.parse(localStorage.getItem('user')).email,
        transaction_amount: parseInt(this.cardForm.controls.amount.value)
      }
      this.PaymentMethodSrv.postMercadopagoPayment(mercadopagoData).subscribe(result=>{
        console.log('PAGO EN MERCADO PAGO REALZIADO, PAGO CON TAREJTA APROVADO Y ACREDITADO')
        console.log(result);
      }),
      (err)=>{
        this.NotificationsCtrl.presentErrorNotification("Pago en Mercado Pago fallido.\nError técnico: "+err);
        console.log(err);
      }
      let mercadopagoStorage = JSON.parse(localStorage.getItem('mercadopagoData'));

      if(mercadopagoStorage){
        mercadopagoStorage.push(mercadopagoData);
        localStorage.setItem('mercadopagoData', JSON.stringify(mercadopagoStorage));
      }
      else{
        localStorage.setItem('mercadopagoData', JSON.stringify([mercadopagoData]));
      }

      console.log(response)
      return response;
    }
};
}
