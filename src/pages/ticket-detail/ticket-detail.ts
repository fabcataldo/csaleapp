import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tickets } from '../../models/tickets';
import { File, IWriteOptions } from '@ionic-native/file';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Accessories } from '../../utils/accessories';
import { CartServiceProvider } from '../../providers/cart-service';
import { HomePage } from '../home/home';
import { NotificationsProvider } from '../../providers/notifications-service';

@IonicPage()
@Component({
  selector: 'page-ticket-detail',
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailPage {
  ticket: Tickets;
  isShopping: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File,
    private CartSrv: CartServiceProvider, private NotificationsCtrl: NotificationsProvider) {
    this.ticket = this.navParams.get('ticket') ? this.navParams.get('ticket') : null;
    this.isShopping = this.navParams.get('isShopping') ? this.navParams.get('isShopping') : false;
  }



  ionViewDidLoad() {
  }

  downloadTicket(){
    const div = document.getElementById("Html2Pdf");
    const options = {background:"white",height :div.clientHeight , width : div.clientWidth  };
    html2canvas(div,options).then((canvas)=>{
      //Initialize JSPDF
      var doc;
      //new jsPDF(orientation (landscape or portrait), unit, format (a4... etc), putOnlyUsedPonts
      //compress, precision, userUnit)
      if(canvas.width > canvas.height){
        doc = new jsPDF('l', 'cm', [canvas.width, canvas.height]);
        }
        else{
        doc = new jsPDF('p', 'cm', [canvas.height, canvas.width]);
        }
      //Converting canvas to Image
      let imgData = canvas.toDataURL("image/PNG");
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 5, 5 );
      
      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
      }

      //writeFile(//This is where the PDF file will stored , you can change it as you like
      // for more information please visit https://ionicframework.com/docs/native/file/,
      //name of pdf)
      //Writing File to Device
      let options: IWriteOptions = {
        replace: true
      }
      this.file.writeFile(this.file.externalApplicationStorageDirectory, "comprobante"+Accessories.makeRandomString(2)+".pdf",buffer, 
        options)
      .then((success)=> this.NotificationsCtrl
      .presentErrorNotification("Ticket guardado!.\nError técnico: "+JSON.stringify(success)))
      .catch((error)=> this.NotificationsCtrl
        .presentErrorNotification("No se pudo guardar el ticket.\nError técnico: "+JSON.stringify(error)))
    });
  }

  toCapitalize(str){
    return Accessories.capitalizeFirstChar(str);
  }

  goToHomePage(){
    this.CartSrv.uploadCart();
    this.navCtrl.setRoot(HomePage);
  }

}
