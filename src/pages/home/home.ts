import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { BenefitsAvailablePage } from '../benefits-available/benefits-available';
import { PurchasesMadePage } from '../purchases-made/purchases-made';
import { UpdatePlacePage } from '../update-place/update-place';

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
    this.getStorageValues();
  }

  async getStorageValues(){
    this.userLogged = await this.storage.get('userOAuth') ? await this.storage.get('userOAuth') : await this.storage.get('user')
    this.token = await this.storage.get('token');
    this.userLoggedName = this.userLogged.name ? this.userLogged.name : null;
  }

  goToBenefitsAvailablePage(){
    this.navCtrl.push(BenefitsAvailablePage);
  }

  goToPurchasesMadePage(){
    this.navCtrl.push(PurchasesMadePage);
  }

  goToUpdatePlacePage(){
    this.navCtrl.push(UpdatePlacePage);
  }

  logOut(){
    if(this.userLogged.loggedWithOAuth2){
      this.signOut();
      this.storage.remove('userOAuth').then(()=>{

      })
    }
    else{
      this.storage.remove('user').then(()=>{

      })  
    }
    this.storage.remove('token').then(()=>{
    })

    this.navCtrl.setRoot(LoginPage)
  }

  signOut(): void {
    try{
    this.afAuth.auth.signOut().then((result)=>{
      console.log(result);
    })
  }catch(err){
    console.log(err)
  }
   }

}
