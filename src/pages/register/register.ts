import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service';
import { LoginPage } from '../login/login';
import { NotificationsProvider } from '../../providers/notifications-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private UserService: UserServiceProvider, private NotificationsCtrl: NotificationsProvider) {
      this.registerForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        name: ['', Validators.compose([Validators.required])],
        surname: ['', Validators.compose([Validators.required])]
      })    
  }

  get formFields() { return this.registerForm.controls; }

  async onClickSubmit(data){
    data.loggedWithOAuth2 = false;
    await this.UserService.postUser(data).subscribe( (data)=>{
      this.NotificationsCtrl.presentOkNotification("Registro exitoso!");
      this.navCtrl.setRoot(LoginPage, {email: this.registerForm.value.email, password: this.registerForm.value.password});
    },
    (err)=>{
      console.log(err);
      this.NotificationsCtrl.presentErrorNotification("Registro fallido.\nError técnico: "+err);
    });
  }

  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }


}
