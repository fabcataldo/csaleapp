import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingServiceProvider {

  constructor(public http: HttpClient,public loadingCtrl: LoadingController) {
    console.log('Hello LoadingServiceProvider Provider');
  }

  showLoading(duration=2000) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img style="max-width: 50%; max-height: 50%;" src="assets/imgs/loading.gif" />',
      duration: duration
    });

    loading.onDidDismiss(() => {
    });

    loading.present();
  }

}
