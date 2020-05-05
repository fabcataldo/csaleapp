import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the RecoverPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var Email:any;
@IonicPage()
@Component({
  selector: 'page-recover-password',
  templateUrl: 'recover-password.html',
})
export class RecoverPasswordPage {
  email: string;
  validEmail: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverPasswordPage');
  }

  onChangeEmail(event){
    let email = event.target.value;
    
  }

  sendEmail(){
    /*
    Email.send({
      Host : "smtp.gmail.com",
      Username : "fabioalbertocataldo@gmail.com",
      Password : "ricardo,fantastico.204",
      To : 'fabioalbertocataldo@gmail.com',
      From : "fabioalbertocataldo@gmail.com",
      Subject : "This is the subject",
      Body : "And this is the body"
  }).then(
    message => alert(message)
  );
   */
  firebase.auth().sendPasswordResetEmail("fabioalbertocataldo@gmail.com")
  .then(function(){
    console.log('FUNCIONOOOO')
  })
  }
}
