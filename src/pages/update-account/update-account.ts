import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service';
import { MyProfilePage } from '../my-profile/my-profile';

/**
 * Generated class for the UpdateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-account',
  templateUrl: 'update-account.html',
})
export class UpdateAccountPage {
  updateAccountForm: FormGroup;
  userDataStrge = JSON.parse(localStorage.getItem('user'));

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private UserService: UserServiceProvider) {
      this.updateAccountForm = this.formBuilder.group({
        email: [this.userDataStrge.email, Validators.compose([Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
        password: [''],
        name: [this.userDataStrge.name],
        surname: [this.userDataStrge.surname]
      })    
      this.formControlsChange();
  }

  formControlsChange(){
    const passwordControl = this.updateAccountForm.get('password');
    passwordControl.valueChanges.subscribe((value)=>{
      if(value.length>0)
        passwordControl.clearValidators();
        passwordControl.setValidators(Validators.compose([Validators.minLength(5)]))
    })
  }

  ionViewDidLoad() {
  }

  get formFields() { return this.updateAccountForm.controls; }

  async onClickSubmit(data){
    data.loggedWithOAuth2 = false;
    if(data.password === ''){
      data.password = this.userDataStrge.password;
    }
    await this.UserService.putUser(this.userDataStrge._id, data).subscribe( (result)=>{
      if(result.token)
        localStorage.token = JSON.stringify(result.token);
      
      result.user._id = this.userDataStrge._id;
      localStorage.user = JSON.stringify(result.user);
      this.navCtrl.push(MyProfilePage, {email: this.updateAccountForm.value.email, 
        name: this.updateAccountForm.value.name, surname: this.updateAccountForm.value.surname});
    }),
    (err)=>{
      console.log(err);
    };
  }

}
