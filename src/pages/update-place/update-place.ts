import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Places } from '../../models/places';
import { PlacesServiceProvider } from '../../providers/places-service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommentsServiceProvider } from '../../providers/comments-service';
import { HomePage } from '../home/home';
import { Comments } from '../../models/comments';
import { UserServiceProvider } from '../../providers/user-service';

/**
 * Generated class for the UpdatePlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-place',
  templateUrl: 'update-place.html',
})
export class UpdatePlacePage {
  selectedPlace: Places;
  token: string;
  places: Places[];
  rating: number = 4;
  comment: string;
  updatePlaceForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public PlacesService : PlacesServiceProvider, private formBuilder: FormBuilder,
    public CommentsServiceProvider: CommentsServiceProvider, private UserSrv: UserServiceProvider
    ) {
      this.updatePlaceForm = this.formBuilder.group({
        comment: ['', Validators.compose([Validators.required])],
        selectedPlace: [null, Validators.compose([Validators.required])],
        rating: [0, Validators.compose([Validators.required])],
      })
      this.formValueChanges();
  }

  ionViewDidLoad() {
    this.getPlaces();
  }

  formValueChanges(){
    const selectedPlaceControl = this.updatePlaceForm.get('selectedPlace');

    selectedPlaceControl.valueChanges.subscribe((value)=>{
        this.selectedPlace = value
    }),
    (err)=>{
      console.log(err)
    }
  }

  async getPlaces(){
    await this.PlacesService.getPlaces().subscribe((places)=>{
      this.places = places;
    }),
    (err)=>{
      console.log(err)
    }
  }
  
  async onClickSubmit(data){
    let newComment = new Comments();
    newComment.comment = data.comment;
    newComment.qualification = data.rating;

    await this.CommentsServiceProvider.postComment(newComment).subscribe((result)=>{
      newComment._id = result._id;
      this.selectedPlace.comments.push(result);
      const placeIndex = this.places.findIndex(item=>{
        item.name === this.selectedPlace.name;
      })
      this.places[placeIndex] = this.selectedPlace;
      let user = JSON.parse(localStorage.getItem('user'));
      user.comments.push(newComment);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
      this.PlacesService.putPlace(this.selectedPlace._id, this.selectedPlace).subscribe((result)=>{
          console.log(result);
      }),
      (err)=>{
        console.log('ERROR al agregar el nuevo comentario en el lugar seleccionado, y guardado en la BD')
        console.log(err)
      }
      this.UserSrv.putUser(user._id, user).subscribe((result)=>{
        console.log(result);
      }),
      (err)=>{
        console.log('ERROR al agregar el nuevo comentario al usuario actual, y guardado en la BD')
        console.log(err);
      }

      this.navCtrl.setRoot(HomePage);
    }),
    (err)=>{
      console.log('ERROR al subir un nuevo comentario del usuario actual')
      console.log(err)
    }
  }
}
