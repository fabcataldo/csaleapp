import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Comments } from '../../models/comments';
import { CommentsServiceProvider } from '../../providers/comments-service/comments-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  comments: any[]=[];

  constructor(public navCtrl: NavController, public CommentsServiceProvider: CommentsServiceProvider) {
    
  }

  ionViewDidLoad(){
    this.CommentsServiceProvider.getComments().subscribe(
      (data)=>{
        this.comments=data;
      },
      (error)=>{
        console.error(error)
      }
    );
  }
}
