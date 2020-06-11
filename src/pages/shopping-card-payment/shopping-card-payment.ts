import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Cart } from '../../models/cart';
import { CartServiceProvider } from '../../providers/cart-service';
import { PaymentMethods } from '../../models/payment_methods';
import { Accessories} from '../../utils/accessories';
import { ShoppingConfirmPage } from '../shopping-confirm/shopping-confirm';
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
  card: any;
  payment: PaymentMethods;
  canPay: boolean = true;
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
    })
    this.getFormFields()['user_name'].setValue(JSON.parse(localStorage.getItem('user')).name)
    this.cart = this.cartSrv.getCart();
    Mercadopago.setPublishableKey("TEST-29ec7fdc-602d-4241-bb97-e94a7dfa7b11")
    console.log('DNISSS : ',Mercadopago.getIdentificationTypes())

    this.card = this.navParams.get('paymentMethod');
    
    this.formControlsChange();
  }


  formControlsChange(){
    let cardNumberControl = this.cardForm.get('card_number');
    cardNumberControl.valueChanges.subscribe((value)=>{
      if(value.length>0){
        cardNumberControl.clearValidators();
        cardNumberControl.setValidators(Validators.compose([Validators.required, Accessories.cardValidator]))
      }
    })
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
        "docNumber": card.user_dni,
        "installments": 1
      }, this.sdkResponseHandler.bind(this));
  }

  onClickSubmit(data){
    let newCard = {
      card_number: data.card_number,
      user_dni: data.user_dni,
      user_name: data.user_name, 
      expiration_date: data.expiration_date,
      security_code: data.security_code
    };

    let newPaymentMethod = new PaymentMethods(
      {
        id: null,
        payment_method: this.card,
        amount_paid: this.cartSrv.getRemainingAmount()
      }
    )
    this.payWithMercadopago(newCard)
    this.cartSrv.savePaymentMethod(newPaymentMethod, 'card');
    this.cartSrv.setCart(this.cartSrv.getCart());

    this.navCtrl.push(ShoppingConfirmPage);
  }

  sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        console.log("verify filled data");
    }else{
      let mercadopagoData = {
        payment_type: 'card',
        token: response.id,
        description: 'pago de compra CSaleApp; monto: , '+this.cartSrv.getRemainingAmount(),
        payment_method_id: 'visa',
        payer_email: JSON.parse(localStorage.getItem('user')).email,
        transaction_amount: this.cartSrv.getRemainingAmount()
      }
      this.PaymentMethodSrv.postMercadopagoPayment(mercadopagoData).subscribe(result=>{
        console.log('PAGO EN MERCADO PAGO REALZIADO, PAGO CON TAREJTA APROVADO Y ACREDITADO')
        console.log(result);
      }),
      (err)=>{
        this.NotificationsCtrl.presentErrorNotification("Pago en Mercado Pago fallido.\nError técnico: "+err);
        console.log(err);
      }
      return response;
    }
};
}
