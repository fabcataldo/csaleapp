import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tickets } from '../../models/tickets';
import { File } from '@ionic-native/file';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/*
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs;
 */
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File) {
    this.ticket = this.navParams.get('ticket');
  }

  ionViewDidLoad() {
    console.log(this.ticket);
  }

  downloadTicket(){
    const div = document.getElementById("Html2Pdf");
    const options = {background:"white",height :div.clientHeight , width : div.clientWidth  };
    html2canvas(div,options).then((canvas)=>{
      //Initialize JSPDF
      var doc = new jsPDF();
      //Converting canvas to Image
      let imgData = canvas.toDataURL("image/PNG");
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 20,20 );
      
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
      this.file.writeFile(this.file.externalApplicationStorageDirectory, "comprobante.pdf",buffer)
      .then((success)=> console.log("File created Succesfully" + JSON.stringify(success)))
      .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));
    });
  }

}
