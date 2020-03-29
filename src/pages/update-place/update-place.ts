import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Places } from '../../models/places';
import { PlacesServiceProvider } from '../../providers/places-service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommentsServiceProvider } from '../../providers/comments-service';
import { HomePage } from '../home/home';
import { Comments } from '../../models/comments';

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
    public CommentsServiceProvider: CommentsServiceProvider
    ) {
      this.updatePlaceForm = this.formBuilder.group({
        comment: ['', Validators.compose([Validators.required])],
        selectedPlace: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        rating: ['', Validators.compose([Validators.required])],
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
    newComment.place = this.selectedPlace;
    newComment.qualification = data.rating;
    newComment.user = JSON.parse(localStorage.getItem('user'));
    console.log(newComment)
    await this.CommentsServiceProvider.postComment(newComment).subscribe((result)=>{
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }),
    (err)=>{
      console.log(err)
    }
  }
}
