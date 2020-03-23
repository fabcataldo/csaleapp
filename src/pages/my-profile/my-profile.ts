import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  usrNameSurname: string;
  usrEmail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      private AlertController: AlertController, private UserService: UserServiceProvider) {
    this.usrNameSurname = JSON.parse(localStorage.getItem('user')).name+' '+JSON.parse(localStorage.getItem('user')).surname;
    this.usrEmail = JSON.parse(localStorage.getItem('user')).email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  showConfirmDialog(){
    let alertConfirm = this.AlertController.create({
      title: 'Eliminar cuenta',
      message: 'Estás seguro que querés eliminar tu cuenta?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.deleteAccount();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('NOO')
          }
        }
      ]
    });
    alertConfirm.present();
  }

  goToUpdateAccountPage(){

  }

  deleteAccount(){
    let userToRmv = JSON.parse(localStorage.getItem('user'));
    this.UserService.deleteUser(userToRmv._id).subscribe((result)=>{
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.navCtrl.setRoot(LoginPage);
    }),
    (err)=>{
      console.log(err)
    };
  }
}
