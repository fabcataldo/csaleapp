import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions) {



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      /*
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_MEDIA_LOCATION).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_MEDIA_LOCATION)
      );
      */
     this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
     .then(
        result=>{
          console.log('Acceso a la ubicación activado');
          // put your code here
          alert("Acceso a la ubicación activado!");
          
          let valueToken = JSON.parse(localStorage.getItem('token'))
          if(valueToken)
            this.rootPage = HomePage;
          else
            this.rootPage = LoginPage
      },
      err => { alert('Acceso a la ubicación denegado. Activalo!.'); }
     )

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

