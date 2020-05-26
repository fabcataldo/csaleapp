import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { PurchasesMadePage } from '../purchases-made/purchases-made';
import { UpdatePlacePage } from '../update-place/update-place';
import { GoogleMap, GoogleMaps, Geocoder, GeocoderResult, GoogleMapOptions, CameraPosition, LatLng, GoogleMapsEvent, HtmlInfoWindow } from '@ionic-native/google-maps';
import { MyProfilePage } from '../my-profile/my-profile';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacesServiceProvider } from '../../providers/places-service';
import { Places } from '../../models/places';
import { PopoverController } from 'ionic-angular';
import { PlaceDetailPage } from '../place-detail/place-detail';
import { ShoppingPage } from '../shopping/shopping';
import { NotificationsProvider } from '../../providers/notifications-service';


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
  mapOptions: GoogleMapOptions = {
    controls: {
      myLocation: true,
      myLocationButton: true
    }
  }
  myPosition: any = {};
  places: Places[];
  placeFounded: Places;
  cardPlaceFounded: boolean;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,
    private geolocation: Geolocation,
    private PlacesServiceProvider: PlacesServiceProvider,
    private NotificationsCtrl: NotificationsProvider) {
  }

  ionViewDidLoad() {
    this.getStorageValues();
    this.loadMap();
    this.getCurrentPosition()

    this.PlacesServiceProvider.getPlaces().subscribe((places) => {
      this.places = places;
      for (let i = 0; i < this.places.length; i++) {
        this.setMarkers(this.places[i]);
      }
    }),
      (err) => {
        this.NotificationsCtrl.presentErrorNotification("No se pudieron cargar los lugares disponibles.\nError técnico: "+err);
        console.log(err)
      }
  }


  getLocation(event) {
    if (event.target.value && event.target.value.trim() != '') {
      Geocoder.geocode({
        "address": event.target.value
      })
        .then((results: GeocoderResult[]) => {
          if (results.length!==0) {
            let positionCamera: CameraPosition<LatLng> = {
              target: new LatLng(results[0].position.lat, results[0].position.lng),
              zoom: 25
            };
            this.map.moveCamera(positionCamera);
            
            this.placeFounded = this.places.filter(item => results[0].extra.lines[0].toLocaleLowerCase() === item.address.toLocaleLowerCase())[0]
            if (!this.placeFounded) {
              this.NotificationsCtrl.presentInfoNotification("El lugar no está disponible en la app.");
            }
            /* */
            else{
              if(this.placeFounded.customer_service_days.find(item => item !== new Date().getDay())){
                this.NotificationsCtrl.presentInfoNotification("El lugar está cerrado. Disfrutalo otro día!");
              }  
            }
          }
        }),
        (err) => {
          this.NotificationsCtrl.presentErrorNotification("Error al buscar el lugar ingresado.\nError técnico: "+err);
          console.log(err)
        }
    }
  }

  getStorageValues() {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    this.userLoggedName = this.userLogged.name ? this.userLogged.name : null;
  }

  goToBenefitsAvailablePage() {
    this.navCtrl.push(ShoppingPage, {filterProductsPerBenefit: true});
  }

  goToMyprofilePage() {
    this.navCtrl.push(MyProfilePage);
  }

  goToPurchasesMadePage() {
    this.navCtrl.push(PurchasesMadePage);
  }

  goToUpdatePlacePage() {
    this.navCtrl.push(UpdatePlacePage);
  }

  logOut() {
    if (this.userLogged.loggedWithOAuth2) {
      this.signOut();
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('place');
    this.navCtrl.setRoot(LoginPage)
  }

  signOut(): void {
    try {
      this.afAuth.auth.signOut().then(() => {
      })
    } catch (err) {
      console.log(err)
    }
  }

  getCurrentPosition() {
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.geolocation.getCurrentPosition().then((result)=>{
        let position: CameraPosition<LatLng> = {
          target: new LatLng(result.coords.latitude, result.coords.longitude),
          zoom: 10
        };
        this.map.moveCamera(position);
      }),
      (err)=>{
        this.NotificationsCtrl.presentErrorNotification("Búsqueda de ubicación actual fallida.\nError técnico: "+err);
      }
    });
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', this.mapOptions);
    this.map.setVisible(true);
    this.map.setAllGesturesEnabled(true);
    this.map.setMyLocationEnabled(true);
    this.map.setMyLocationButtonEnabled(true);
  }

  getStateOfPlace(place){
    if(place.customer_service_days.find(item => item===new Date().getDay())){
      return true;
    }
    return false;
  }

  setPlaceInfoWindow(place) {
    let isPlaceOpen = this.getStateOfPlace(place);
    let htmlInfoWindow = new HtmlInfoWindow();
    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = [
      '<div>',
      '<div>',
      '<img style="max-width: 100%; height: auto;" src="assets/imgs/background.jpg">',
      '</div>',
      '<br>',
      '<div>',
      '<h1 style="color:black; text-align: center;">' + place.name + '</h1>',
      '<h2 style="color:black; text-align: center;">' + place.address + '</h2>',
      isPlaceOpen ?  '<h2 style="color:black; text-align: center;">Estado: Abierto!' + '</h2>' : 
      '<h2 style="color:black; text-align: center;">Estado: Cerrado!' + '</h2>',
      '</div>',
      '</div>'
    ].join("");
    frame.getElementsByTagName("div")[0].addEventListener("click", () => {
      if(place.customer_service_days.find(item => {return item == new Date().getDay() })!==0 ){
        this.navCtrl.push(PlaceDetailPage, { place: place });        
      }  
      else{
        this.NotificationsCtrl.presentInfoNotification("El lugar está cerrado. Disfrutalo otro día!");

      }
    });
    htmlInfoWindow.setContent(frame, { width: "25rem", height: "36rem" });
    return htmlInfoWindow;
  }


  setMarkers(place) {
    let marker = this.map.addMarkerSync({
      position: { lat: place.lat, lng: place.lng },
      title: place.title,
      animation: 'DROP',
      icon: 'red'
    })

    let markerInfoWindow = this.setPlaceInfoWindow(place);

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      markerInfoWindow.open(marker);
    });
  }
}

