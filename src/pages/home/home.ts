import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  comments: any;
  userLogged: any;
  token: any;
  userLoggedName: string;
  

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public storage: Storage ) {
    
  }

  ionViewDidLoad(){
    console.log('asd')
    this.getStorageValues();
  }

  ionViewWillEnter(){
    
  }
  async getStorageValues(){
    this.userLogged = await this.storage.get('userOAuth')
    this.token = await this.storage.get('token');
    this.userLoggedName = this.userLogged.name ? this.userLogged.name : null;
  }

  signOut(): void {
    try{
    this.afAuth.auth.signOut().then((result)=>{
      //elimino lo que haya en el storage, y me voy a
      this.storage.remove('user').then(()=>{

      })
      this.storage.remove('token').then(()=>{

      })

      this.navCtrl.setRoot(LoginPage)
    })
  }catch(err){
    console.log(err)
  }
   }

}
