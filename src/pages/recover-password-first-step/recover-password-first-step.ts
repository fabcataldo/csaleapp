import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service';
import { NotificationsProvider } from '../../providers/notifications-service';
import { RecoverPasswordFinalStepPage } from '../recover-password-final-step/recover-password-final-step';

/**
 * Generated class for the RecoverPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recover-password',
  templateUrl: 'recover-password-first-step.html',
})
export class RecoverPasswordFirstStepPage {
  passwordResetForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, private UserService: UserServiceProvider, 
    private NotificationsCtrl: NotificationsProvider) {
      this.passwordResetForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      }) 
  }

  get formFields() { return this.passwordResetForm.controls; }

  async formSubmit(formData){
    await this.UserService.passwordResetRequest({userEmail: formData.email}).subscribe( (data)=>{
      this.navCtrl.push(RecoverPasswordFinalStepPage, {passwordResetToken: data.passwordResetToken, userEmail: formData.email});
    },
    (err)=>{
      console.log(err);
      this.NotificationsCtrl.presentErrorNotification("Error en el servidor.\nError técnico: "+err);
    });
  }

}
