import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CommentsServiceProvider } from '../providers/comments-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserServiceProvider } from '../providers/user-service';
import { PlacesServiceProvider } from '../providers/places-service';
import { TicketsServiceProvider } from '../providers/tickets-service';
import { ProductsServiceProvider } from '../providers/products-service';
import { RolesServiceProvider } from '../providers/roles-service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { UpdatePlacePage } from '../pages/update-place/update-place';
import { PurchasesMadePage } from '../pages/purchases-made/purchases-made';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicSelectableModule } from 'ionic-selectable';
import { AuthInterceptorServiceProvider } from '../providers/auth-interceptor-service';
import { StarRatingModule } from 'ionic3-star-rating';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { UpdateAccountPage } from '../pages/update-account/update-account'; 
import { TicketDetailPage } from '../pages/ticket-detail/ticket-detail';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {Geolocation} from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PlaceDetailPage } from '../pages/place-detail/place-detail';
import { ShoppingPage } from '../pages/shopping/shopping';
import { ShoppingCheckoutPage } from '../pages/shopping-checkout/shopping-checkout';
import { CartServiceProvider } from '../providers/cart-service';
import { ShoppingCashPaymentPage } from '../pages/shopping-cash-payment/shopping-cash-payment';
import { ShoppingCardPaymentPage } from '../pages/shopping-card-payment/shopping-card-payment';
import { AvailablePaymentMethodsServiceProvider } from '../providers/available-payment-methods';
import { PaymentMethodsServiceProvider } from '../providers/payment-methods';

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
    PurchasesMadePage,
    UpdatePlacePage,
    MyProfilePage,
    UpdateAccountPage,
    TicketDetailPage,
    PlaceDetailPage,
    ShoppingPage,
    ShoppingCheckoutPage,
    ShoppingCashPaymentPage,
    ShoppingCardPaymentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicSelectableModule,
    StarRatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PurchasesMadePage,
    UpdatePlacePage,
    MyProfilePage,
    UpdateAccountPage,
    TicketDetailPage,
    PlaceDetailPage,
    ShoppingPage,
    ShoppingCheckoutPage,
    ShoppingCashPaymentPage,
    ShoppingCardPaymentPage
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
    GooglePlus,
    Facebook,
    GoogleMaps,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServiceProvider,
      multi: true
    },
    File,
    FileOpener,
    Geolocation,
    AndroidPermissions,
    CartServiceProvider,
    AvailablePaymentMethodsServiceProvider,
    PaymentMethodsServiceProvider
  ]
})
export class AppModule {}
