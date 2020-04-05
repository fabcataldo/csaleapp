import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tickets } from "../../models/tickets";
import { TicketDetailPage } from '../ticket-detail/ticket-detail';

/**
 * Generated class for the PurchasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases-made.html',
})
export class PurchasesMadePage {
  public tickets: Tickets[];
  public totalPurchase: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
   ) {
      this.tickets = JSON.parse(localStorage.getItem('user')).tickets;
  }

  ionViewDidLoad() {
  }

  viewTicketDetail(ticket){
    this.navCtrl.push(TicketDetailPage, {ticket: ticket});
  }

}
