import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Comments } from '../../models/comments';
import { CommentsServiceProvider } from '../../providers/comments-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  comments: any;
  

  constructor(public navCtrl: NavController, public CommentsServiceProvider: CommentsServiceProvider) {
    
  }

  ionViewDidLoad(){
    //this.getData();
  }

  /*
  getData(){
    this.CommentsServiceProvider.getComments('enviar_token')
    .then( (data)=>{
        this.comments=data;
      });      
  }
  */
}
