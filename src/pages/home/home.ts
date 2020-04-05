import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { BenefitsAvailablePage } from '../benefits-available/benefits-available';
import { PurchasesMadePage } from '../purchases-made/purchases-made';
import { UpdatePlacePage } from '../update-place/update-place';
import { GoogleMap, GoogleMaps, Geocoder, GeocoderResult, GoogleMapOptions, CameraPosition, LatLng, MarkerOptions, GoogleMapsEvent, HtmlInfoWindow } from '@ionic-native/google-maps';
import { MyProfilePage } from '../my-profile/my-profile';
import { TicketsServiceProvider } from '../../providers/tickets-service';
import { Tickets } from '../../models/tickets';
import {Geolocation} from '@ionic-native/geolocation';
import { PlacesServiceProvider } from '../../providers/places-service';
import { Places } from '../../models/places';
import { PopoverController } from 'ionic-angular';  
import { PlaceBasicInfoComponent } from '../../components/place-basic-info/place-basic-info';
import { PlaceDetailPage } from '../place-detail/place-detail';


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
  placeFounded: Places;
  cardPlaceFounded: boolean;


  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,  
    public TicketsSrv: TicketsServiceProvider, private geolocation: Geolocation,
    private PlacesServiceProvider: PlacesServiceProvider, private PopoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.getStorageValues();
    this.loadMap();
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
          zoom: 25
        };
        this.map.moveCamera(positionCamera);

        this.placeFounded = this.places.filter(item=>results[0].extra.lines[0] === item.address)[0]

        console.log('THIS.PLACEFOUDNEDDDDD')
        console.log(this.placeFounded)
        
        let marker = this.map.addMarkerSync({
          'position': results[0].position,
          'title': this.placeFounded.name
        })

        let htmlInfoWindow = new HtmlInfoWindow();
        let frame: HTMLElement = document.createElement('div');
        frame.innerHTML = [
          '<div>',
            '<div>',
              '<img src="assets/imgs/background.jpg">',
            '</div>',
            '<div>',
              '<h1 style="color:black; text-align: center;">'+this.placeFounded.name+'</h1>',
              '<h2 style="color:black; text-align: center;">'+this.placeFounded.address+'</h2>',
              '<h2 style="color:black; text-align: center;">Estado: <h2 style="color:black; font-weight:bold">Abierto!'+'</h2>',
            '</div>',
          '</div>'
            //'<!--<p style="font-weight: bold;"> {{this.placeFounded.state}}</p>-->',
        ].join("");
        frame.getElementsByTagName("div")[0].addEventListener("click", () => {
          this.navCtrl.push(PlaceDetailPage, {place: this.placeFounded});
        });
        htmlInfoWindow.setContent(frame, {width: "19rem", height: "15rem"});

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          //ACÁ AHCER LA CARD DEL PROTOTIPO, Y QUE EL CALL TO ACTON SEA
          // AL DETALLE DE ESTE LUGAR, Y TERMINO EL FLUJO
          //LUGAR AGENDADO EN LA BD, VALIDO, LEVANTO LA CARD entonces

          //this.openPlaceBasicInfoModal(new Event(GoogleMapsEvent.MARKER_CLICK));
          htmlInfoWindow.open(marker);
          console.log(this.cardPlaceFounded)
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
    /*
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
     */

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      this.map.getMyLocation().then((result)=>{
        console.log('MY LOCATION: ',result)
        let position: CameraPosition<LatLng> = {
          target: new LatLng(result.latLng.lat, result.latLng.lng),
          zoom: 20
        };
        this.map.moveCamera(position);
      })
      /*
      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Hola , soy turista!",
        icon: 'red',
        animation: 'DROP',
      };
      this.map.addMarkerSync(markerOptions)
      //this.setMarkers(markerOptions);
      */ 
    });
  }

  loadMap(){
    this.map = GoogleMaps.create('map_canvas', this.mapOptions);
    this.map.setVisible(true);
    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(()=>{
        this.cardPlaceFounded = false;

        console.log(this.cardPlaceFounded)
      })
    })
    this.map.setAllGesturesEnabled(true);
    this.map.setMyLocationEnabled(true);
    this.map.setMyLocationButtonEnabled(true);
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

