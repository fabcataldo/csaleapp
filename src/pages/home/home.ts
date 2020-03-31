import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { BenefitsAvailablePage } from '../benefits-available/benefits-available';
import { PurchasesMadePage } from '../purchases-made/purchases-made';
import { UpdatePlacePage } from '../update-place/update-place';
import { GoogleMap, GoogleMaps, Geocoder, GeocoderResult } from '@ionic-native/google-maps';
import { MyProfilePage } from '../my-profile/my-profile';
import { TicketsServiceProvider } from '../../providers/tickets-service';
import { Tickets } from '../../models/tickets';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  comments: any;
  userLogged: any;
  token: any;
  userLoggedName: string;
  map: GoogleMap;

  tickets: Tickets[];

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,  
    public TicketsSrv: TicketsServiceProvider) {

  }

  ionViewDidLoad() {
    this.getStorageValues();
    this.loadMap();
    //this.setMarkers();

    this.TicketsSrv.getTickets().subscribe((res)=>{
      this.tickets = res;
    }),
    (err)=>{
      console.log(err);
    }
  }

  getLocation(event){
    var value = event.target.value;
    if (value && value.trim() != '') {
      Geocoder.geocode({
        "address": event.target.value
      })
      .then((results: GeocoderResult[])=>{
        console.log(results);
  
        return this.map.addMarker({
          'position': results[0].position,
          'title': JSON.stringify(results[0].position)

        })
      }),
      (err)=>{
        console.log(err)
      }
    }
  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }


  getStorageValues() {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    this.userLoggedName = this.userLogged.name ? this.userLogged.name : null;
  }

  goToBenefitsAvailablePage() {
    this.navCtrl.push(BenefitsAvailablePage);
  }

  goToMyprofilePage(){
    this.navCtrl.push(MyProfilePage);
  }

  goToPurchasesMadePage() {
    this.navCtrl.push(PurchasesMadePage, {tickets:this.tickets});
  }

  goToUpdatePlacePage() {
    this.navCtrl.push(UpdatePlacePage);
  }

  logOut() {
    if (this.userLogged.loggedWithOAuth2) {
      this.signOut();
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token')
    this.navCtrl.setRoot(LoginPage)
  }

  signOut(): void {
    try {
      this.afAuth.auth.signOut().then((result) => {
        //console.log(result);
      })
    } catch (err) {
      console.log(err)
    }
  }

  loadMap(){
    this.map = GoogleMaps.create('map_canvas');
    this.getPosition();
  }

  /*
  setMarkers(){
    let marker = this.map.addMarkerSync({
      title: 'La Barra Boliche',
      icon: 'red',
      animation: 'DROP',
      position:{
        lat: -31.4132711,
        lng: -64.1827632
      }
    });
    //marker.showInfoWindow();
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
   */
}

