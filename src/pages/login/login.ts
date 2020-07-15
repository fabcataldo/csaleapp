import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service';
import { RegisterPage } from '../register/register';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Users } from '../../models/users';
import { NotificationsProvider } from '../../providers/notifications-service';
import { RecoverPasswordFirstStepPage } from '../recover-password-first-step/recover-password-first-step';
import { LoadingServiceProvider } from '../../providers/loading-service';

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
  userOAuth: any;
  tokenUserOAuth: string;
  loginForm: FormGroup;
  user: any;
  loggedIn: boolean;
  FB_APP_ID: number = 326509618306218;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private UserService: UserServiceProvider,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus, private platform: Platform,
    private fb: Facebook,
    private NotificationsCtrl: NotificationsProvider, private LoadingCtrl: LoadingServiceProvider
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    })

  }

  ionViewDidLoad() {
    if (this.navParams.get('email') && this.navParams.get('password')) {
      this.loginForm.setValue({
        email: this.navParams.get('email'),
        password: this.navParams.get('password')
      });
    }
  }
  get formFields() { return this.loginForm.controls; }

  async onClickSubmit(data) {
    this.LoadingCtrl.showLoading(2000);
    await this.UserService.loginUser(data).subscribe((data) => { 
        this.user = new Users(data['user']);
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', JSON.stringify(data['token']));
        this.navCtrl.setRoot(HomePage);
      },
      (err) => {
        this.NotificationsCtrl.presentErrorNotification("No se pudo iniciar sesión.\nError técnico: "+err.message);
      });
  }

  async saveOAuthUser() {
    this.LoadingCtrl.showLoading(2000);
    await this.UserService.postUser(this.userOAuth).subscribe((res: any) => {
        this.userOAuth = res.user;
        this.tokenUserOAuth = res.token;

        localStorage.setItem('user', JSON.stringify(this.userOAuth))
        localStorage.setItem('token', JSON.stringify(this.tokenUserOAuth));
        this.navCtrl.setRoot(HomePage);
      },
      (err) => {
        this.NotificationsCtrl.presentErrorNotification("No se pudo guardar los datos del usuario.\nError técnico: "+err);
      })
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  socialLogin(facebook: boolean) {
    if (this.platform.is('cordova')) {
      if (facebook) {
        this.nativeFacebookLogin();
      }
      else {
        this.nativeGoogleLogin();
      }
    } else {
      if (facebook) {
        this.webFacebookLogin();
      }
      else {
        this.webGoogleLogin();
      }
    }
  }

  async nativeGoogleLogin(): Promise<void> {
       this.gplus.login({
        'webClientId': '1094589895444-np6ve4h2mkm3bste3bvc9olk5kksko9f.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      }).then((obj)=>{
        if (!firebase.auth().currentUser) {
          firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
          .then((success) => {
              this.userOAuth = {
                name: obj.givenName,
                surname: obj.familyName, 
                email: obj.email,
                password: '', role: null, loggedWithOAuth2: true
              };
              this.saveOAuthUser();
            })
          .catch((gplusErr) => {
              this.NotificationsCtrl.presentErrorNotification("No se pudo iniciar sesión con Google.\nError técnico: "+gplusErr);
          });
        }
      })
  }

  async nativeFacebookLogin() {
    const permissions = ["public_profile", "email"];
    this.fb.login(permissions).then(response => {
      if(response.status === "connected") {
        console.log('Logged')
      } else {
        console.log("Not logged in :(");
      }
    }, error => {
      this.NotificationsCtrl.presentErrorNotification("No se pudo iniciar sesión con Facebook.\nError técnico: "+ error);
    });
  }

  async webFacebookLogin(): Promise<void> {
    var auth2 = this.afAuth
    try {
      var newUser = null;
      
      const provider = new firebase.auth.FacebookAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider)
        .then((result) => {
          newUser = {
            name: result.user.displayName.split(" ")[0],
            surname: result.user.displayName.split(" ")[1], 
            email: result.user.email ? result.user.email :
              result.additionalUserInfo.profile ? result.additionalUserInfo.profile['email'] : null,
            password: '', role: null, loggedWithOAuth2: true
          };
        });
        this.userOAuth = newUser;
        this.saveOAuthUser();
    } catch (error) {
      console.log(error)
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      let userAuth = null;
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider)
        .then((result) => {
          console.log(result)
          userAuth = {
            name: result.user.displayName.split(" ")[0],
            surname: result.user.displayName.split(" ")[1], 
            email: result.user.email ? result.user.email :
              result.additionalUserInfo.profile ? result.additionalUserInfo.profile['email'] : null,
            password: '', role: null, loggedWithOAuth2: true
          };
        });
      this.userOAuth = userAuth
      this.saveOAuthUser();

    } catch (err) {
      console.log(err);
    }
  }

  goToRecoverPasswordPage(){
    this.navCtrl.push(RecoverPasswordFirstStepPage);
  }

}
