import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsProvider } from '../../providers/notifications-service';
import { UserServiceProvider } from '../../providers/user-service';
import { ThrowStmt } from '@angular/compiler';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private UserService: UserServiceProvider, 
    private NotificationsCtrl: NotificationsProvider) {
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

  
  get formFields() { return this.passwordResetForm.controls; }

  async formSubmit(formData){
    console.log(formData.newPassword)
    var passwordResetBody = {
      passwordResetToken: this.passwordResetToken,
      newPassword: formData.newPassword
    }
    await this.UserService.passwordReset(passwordResetBody).subscribe( (data)=>{
      this.NotificationsCtrl.presentOkNotification("Revisá tu correo para continuar!.");
      localStorage.removeItem('passwordResetToken');
      this.navCtrl.setRoot(LoginPage, {email: this.userEmail, password: formData.newPassword});
    },
    (err)=>{
      console.log(err);
      this.NotificationsCtrl.presentErrorNotification("Falla en el envío del mail de recuperación.\nError técnico: "+err);
    });
  }
}
