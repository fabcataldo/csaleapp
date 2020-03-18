import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CommentsServiceProvider } from '../providers/comments-service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { UserServiceProvider } from '../providers/user-service';
import { PlacesServiceProvider } from '../providers/places-service';
import { TicketsServiceProvider } from '../providers/tickets-service';
import { ProductsServiceProvider } from '../providers/products-service';
import { RolesServiceProvider } from '../providers/roles-service';
import { PrivilegesServiceProvider } from '../providers/privileges-service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { BenefitsAvailablePage } from '../pages/benefits-available/benefits-available';
import { UpdatePlacePage } from '../pages/update-place/update-place';
import { PurchasesMadePage } from '../pages/purchases-made/purchases-made';

const firebaseConfig = {
  apiKey: "AIzaSyDX2SigUNlJ_UiHX_DEQ6NvNFDvXBgcF0g",
  authDomain: "csaleapp-270523.firebaseapp.com",
  databaseURL: "https://csaleapp-270523.firebaseio.com",
  projectId: "csaleapp-270523",
  storageBucket: "csaleapp-270523.appspot.com",
  messagingSenderId: "1094589895444",
  appId: "1:1094589895444:web:ee27ac73da014af2da2801",
  measurementId: "G-Y2RZRHBC6G"
};
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    BenefitsAvailablePage,
    PurchasesMadePage,
    UpdatePlacePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'csalestrg',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    BenefitsAvailablePage,
    PurchasesMadePage,
    UpdatePlacePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommentsServiceProvider,
    UserServiceProvider,
    PlacesServiceProvider,
    TicketsServiceProvider,
    ProductsServiceProvider,
    RolesServiceProvider,
    PrivilegesServiceProvider,
    GooglePlus,
    Facebook
  ]
})
export class AppModule {}
