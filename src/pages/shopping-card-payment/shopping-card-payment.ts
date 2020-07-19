import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Cart } from '../../models/cart';
import { CartServiceProvider } from '../../providers/cart-service';
import { PaymentMethods } from '../../models/payment_methods';
import { Accessories} from '../../utils/accessories';
import { ShoppingConfirmPage } from '../shopping-confirm/shopping-confirm';
import { PaymentMethodsServiceProvider } from '../../providers/payment-methods-service';
import { NotificationsProvider } from '../../providers/notifications-service';
import { Global } from '../../utils/global';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, private cartSrv: CartServiceProvider,
    private PaymentMethodSrv: PaymentMethodsServiceProvider,
    private NotificationsCtrl: NotificationsProvider) {
    
    this.cardForm = this.formBuilder.group({
      card_number: ['', Validators.compose([Validators.required, (control) => Accessories.cardValidator(control)])],
      user_dni: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
      user_name: ['', Validators.compose([Validators.required])],
      security_code: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      expiration_date: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    })
    let actualUser = JSON.parse(localStorage.getItem('user'))
    this.getFormFields()['user_name'].setValue(actualUser.name + ' ' + actualUser.surname);
    this.cart = this.cartSrv.getCart();
    
    Mercadopago.setPublishableKey(Global.MERCADO_PAGO_PUBLIC_KEY)

    this.card = this.navParams.get('paymentMethod');
  }

  getFormFields() { return this.cardForm.controls; }

  payWithMercadopago(card){
      var respuesta = Mercadopago.createToken({
        "cardNumber" : card.card_number,
        "securityCode" : card.security_code ,
        "cardExpirationMonth" : card.expiration_date.substring(0,2),
        "cardExpirationYear" : card.expiration_date.substring(3,5),
        "cardholderName" : card.user_name,
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
        amount_paid: this.cart.ticket.total
      }
    )
    this.payWithMercadopago(newCard)
    this.cartSrv.savePaymentMethod(newPaymentMethod);
    this.cartSrv.setCart(this.cartSrv.getCart());
    this.navCtrl.push(ShoppingConfirmPage);
  }

  async sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        console.log("verify filled data");
    }else{
      let mercadopagoData = {
        payment_type: 'card',
        token: response.id,
        description: 'pago de compra CSaleApp; monto: , '+this.cartSrv.getTotalPaid(),
        payment_method_id: 'visa',
        payer_email: JSON.parse(localStorage.getItem('user')).email,
        issuer_id: '',
        transaction_amount: this.cartSrv.getTotalPaid()
      }
      await this.PaymentMethodSrv.postMercadopagoPayment(mercadopagoData).subscribe(result=>{
        console.log('PAGO EN MERCADO PAGO REALZIADO, PAGO CON TAREJTA APROVADO Y ACREDITADO')
        console.log(result);
      },
      (err)=>{
        this.NotificationsCtrl.presentErrorNotification("Pago en Mercado Pago fallido.\nError técnico: "+err);
        console.log(err);
      })
      return response;
    }
};
}
