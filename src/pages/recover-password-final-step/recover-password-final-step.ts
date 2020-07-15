import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,  Navbar } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsProvider } from '../../providers/notifications-service';
import { UserServiceProvider } from '../../providers/user-service';
import { LoginPage } from '../login/login';
import { LoadingServiceProvider } from '../../providers/loading-service';

/**
 * Generated class for the RecoverPasswordFinalStepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recover-password-final-step',
  templateUrl: 'recover-password-final-step.html',
})
export class RecoverPasswordFinalStepPage {
  passwordResetToken: string;
  passwordResetForm: FormGroup;
  userEmail: string;

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private UserService: UserServiceProvider, 
    private NotificationsCtrl: NotificationsProvider, private LoadingCtrl: LoadingServiceProvider) {
    this.passwordResetForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.required])],
    }) 
  }

  ionViewDidLoad() {
    if (this.navParams.get('passwordResetToken') && this.navParams.get('userEmail')) {
      this.passwordResetToken = this.navParams.get('passwordResetToken');
      localStorage.setItem('passwordResetToken', JSON.stringify(this.passwordResetToken))
      this.userEmail = this.navParams.get('userEmail');
    }
  }

  backButtonHandler(){
    localStorage.clear();
    this.navCtrl.popTo('RecoverPasswordFirstStepPage');
  }
  
  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonHandler;
  }

  get formFields() { return this.passwordResetForm.controls; }

  async formSubmit(formData){
    var passwordResetBody = {
      passwordResetToken: this.passwordResetToken,
      newPassword: formData.newPassword
    }
    this.LoadingCtrl.showLoading(1000);
    await this.UserService.passwordReset(passwordResetBody).subscribe( (data)=>{
      this.NotificationsCtrl.presentOkNotification("Cuenta recuperada!. Ahora vas a poder iniciar sesión directamente");
      localStorage.removeItem('passwordResetToken');
      this.navCtrl.setRoot(LoginPage, {email: this.userEmail, password: formData.newPassword});
    },
    (err)=>{
      console.log(err);
      this.NotificationsCtrl.presentErrorNotification("Falla en el envío del mail de recuperación.\nError técnico: "+err);
    });
  }
}
