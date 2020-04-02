import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { BenefitsAvailablePage } from '../benefits-available/benefits-available';
import { PurchasesMadePage } from '../purchases-made/purchases-made';
import { UpdatePlacePage } from '../update-place/update-place';
import { GoogleMap, GoogleMaps, Geocoder, GeocoderResult, GoogleMapOptions, CameraPosition, LatLng, MarkerOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { MyProfilePage } from '../my-profile/my-profile';
import { TicketsServiceProvider } from '../../providers/tickets-service';
import { Tickets } from '../../models/tickets';
import {Geolocation} from '@ionic-native/geolocation';
import { PlacesServiceProvider } from '../../providers/places-service';

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
  mapOptions: GoogleMapOptions = {
    controls: {
      myLocation: true,
      myLocationButton: true         
    }, 
  }
  myPosition: any={};
  places: Places[];


  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,  
    public TicketsSrv: TicketsServiceProvider, private geolocation: Geolocation,
    private PlacesServiceProvider: PlacesServiceProvider) {
  }

  ionViewDidLoad() {
    this.getStorageValues();
    this.getCurrentPosition()
    
    this.PlacesServiceProvider.getPlaces().subscribe((places)=>{
      this.places = places;
      for(let i=0;i<this.places.length;i++){
        this.setMarkers(this.places[i].lat, this.places[i].lng, this.places[i].name);
      }
    }),
    (err)=>{
      console.log(err)
    }

    this.TicketsSrv.getTickets().subscribe((res)=>{
      this.tickets = res;
    }),
    (err)=>{
      console.log(err);
    }
  }


  getLocation(event){
    var value = event.target.value;
    var locationResult=null;
    if (value && value.trim() != '') {
      Geocoder.geocode({
        "address": event.target.value
      })
      .then((results: GeocoderResult[])=>{
        console.log(results);
        locationResult = results;
        let positionCamera: CameraPosition<LatLng> = {
          target: new LatLng(results[0].position.lat, results[0].position.lng),
          zoom: 17 
        };
        this.map.moveCamera(positionCamera);
        let marker = this.map.addMarkerSync({
          'position': results[0].position,
          'title': event.target.value
        })
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          //ACÁ AHCER LA CARD DEL PROTOTIPO, Y QUE EL CALL TO ACTON SEA
          // AL DETALLE DE ESTE LUGAR, Y TERMINO EL FLUJO

          console.log('Location result: ',locationResult)
          //LUGAR AGENDADO EN LA BD, VALIDO, LEVANTO LA CARD entonces
          var aux = this.places.filter(item=>results[0].extra.lines[0] === item.address)
          if(aux){
            alert('clicked: ');
          }
        });
        return marker;
      }),
      (err)=>{
        console.log(err)
      }
    }
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

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.loadMap();
    })
    .catch(error=>{
      console.log(error);
    })
  }

  loadMap(){
    
    this.map = GoogleMaps.create('map_canvas', this.mapOptions);
    this.map.setVisible(true);
     // create CameraPosition
     let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.lat, this.myPosition.lng),
      zoom: 17 
    };
    this.map.setAllGesturesEnabled(true);
    this.map.setMyLocationEnabled(true);
    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);
      console.log(this.myPosition)
      console.log(position)
      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Hola , soy turista!",
        icon: 'red',
        animation: 'DROP',
      };
      this.map.addMarkerSync(markerOptions)
      //this.setMarkers(markerOptions);
      
    });
  }

  
  setMarkers(lat, lng, title){
    let marker = this.map.addMarkerSync({
      title:  title,
      icon: 'red',
      animation: 'DROP',
      position:{
        lat: lat,
        lng: lng
      }
    });
    //marker.showInfoWindow();
  }
 
}

