import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tickets } from '../../models/tickets';

/**
 * Generated class for the TicketDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-detail',
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailPage {
  ticket:Tickets;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ticket = this.navParams.get('ticket');
  }

  ionViewDidLoad() {
    console.log(this.ticket);
  }

}
