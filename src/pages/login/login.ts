import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service';
import { RegisterPage } from '../register/register';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook/ngx';

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
    private fb: Facebook
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
    await this.UserService.loginUser(data).subscribe((data) => {
        this.user = data;

        localStorage.setItem('user', JSON.stringify(this.user.user))
        localStorage.setItem('token', JSON.stringify(this.user.token))
        this.navCtrl.setRoot(HomePage);
      }),
      (err) => {
        console.log(err);
      };
  }

  saveOAuthUser() {
    this.UserService.postUser(this.userOAuth).subscribe((res: any) => {
        this.userOAuth = res.user;
        this.tokenUserOAuth = res.token;

        localStorage.setItem('user', JSON.stringify(this.userOAuth))
        localStorage.setItem('token', JSON.stringify(this.tokenUserOAuth));
        this.navCtrl.setRoot(HomePage);
      }),
      (err) => {
        console.log(err)
      }
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
    try {
      let userAuth = null;
      const gplusUser = await this.gplus.login({
        'webClientId': '979369541957-fg74ign642oj0dv66jonrmpkp45rj3ka.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      const credential = await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
        
      )
      .then((result) => {
        userAuth = {
          name: result.user.displayName.split(" ")[0],
          surname: result.user.displayName.split(" ")[1], email: result.user.email,
          password: '', role: null, loggedWithOAuth2: true
        };
      });
    this.userOAuth = userAuth
    this.saveOAuthUser();
      
    } catch (err) {
      console.log(err)
    }
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
      console.log(error);
    });
  }

  async webFacebookLogin(): Promise<void> {
    try {
      let user = null;
      var newUser = null;
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider)
        .then((result) => {
          user = result.user;
          result.user.getIdToken().then((token) => {
            this.tokenUserOAuth = token
          })
          newUser = {
            name: result.user.displayName.split(" ")[0],
            surname: result.user.displayName.split(" ")[1], email: result.user.email,
            password: '', role: null, loggedWithOAuth2: true
          };
        });
      this.userOAuth = newUser;
      this.saveOAuthUser();

    } catch (err) {
      console.log(err);
      this.afAuth.auth.signOut()
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      let userAuth = null;
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider)
        .then((result) => {
          userAuth = {
            name: result.user.displayName.split(" ")[0],
            surname: result.user.displayName.split(" ")[1], email: result.user.email,
            password: '', role: null, loggedWithOAuth2: true
          };

          //var credential2 = result.credential as firebase.auth.OAuthCredential       
          //this.tokenUserOAuth = credential2.accessToken;
        });
      this.userOAuth = userAuth
      this.saveOAuthUser();

    } catch (err) {
      console.log(err);
    }
  }

}
