import { Comments } from './../../models/comments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CommentsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CommentsServiceProvider Provider');
  }

  getComments() {
    return this.http.get('https://randomuser.me/api/?results=25');
  }

}
