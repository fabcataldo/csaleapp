import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  constructor(public http: HttpClient, private toastCtrl: ToastController) {
    console.log('Hello NotificationsProvider Provider');
  }

  
  presentOkNotification(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top",
      cssClass: "okToastStyle"
    });
    toast.present();
  }

  presentErrorNotification(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top",
      cssClass: "errorToastStyle"
    });
    toast.present();
  }

  presentInfoNotification(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top",
      cssClass: "infoToastStyle"
    });
    toast.present();
  }

}
