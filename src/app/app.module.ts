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
import { StorageManager } from '../services/storageManager';
import { RegisterPage } from '../pages/register/register';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'csalestrg',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
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
    StorageManager
  ]
})
export class AppModule {}
