import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,  Navbar } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service';
import { LoginPage } from '../login/login';
import { UpdateAccountPage } from '../update-account/update-account';
import { HomePage } from '../home/home';

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
  disableUpdateAccount: boolean;

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
      private AlertController: AlertController, private UserService: UserServiceProvider
      ) {
        if (this.navParams.get('email') && this.navParams.get('name') && this.navParams.get('surname') ) {
          this.usrNameSurname = this.navParams.get('name')+' '+this.navParams.get('surname');
          this.usrEmail = this.navParams.get('email');
        }
        else{
          this.usrNameSurname = JSON.parse(localStorage.getItem('user')).name+' '+JSON.parse(localStorage.getItem('user')).surname;
          this.usrEmail = JSON.parse(localStorage.getItem('user')).email;
        }
      this.disableUpdateAccount = JSON.parse(localStorage.getItem('user')).loggedWithOAuth2 ? true : false;
  }

  backButtonHandler(){
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonHandler;
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
    this.navCtrl.push(UpdateAccountPage);
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
