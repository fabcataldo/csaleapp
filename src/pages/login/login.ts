import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private UserService: UserServiceProvider, public storage: Storage) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    })    
    
  }

  ionViewDidLoad() {
    if(this.navParams.get('email') && this.navParams.get('password') ){
      this.loginForm.setValue({
        email: this.navParams.get('email'), 
        password: this.navParams.get('password')
      });
    }
  }

  get formFields() { return this.loginForm.controls; }

  async onClickSubmit(data){
    await this.UserService.loginUser(data)
    .then( (data)=>{
      this.user=data;
      this.storage.set('user',this.user.user);
      this.storage.set('token',this.user.token);

      this.navCtrl.setRoot(HomePage);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
