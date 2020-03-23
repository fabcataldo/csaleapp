import { Comments } from '../models/comments';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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

  getComments():Observable<Comments[]> {
    return this.http
      .get<Comments>('http://192.168.0.16:3000/api/comments')
      .pipe(map(this.mapComments))
  }
  
  mapComments(res:any){
    return (res) ? res.map((comment)=>new Comments(comment)) : res.map((comment)=>new Comments(comment));
  }

  getComment(id): Observable<Comments>{
    return this.http
      .get<Comments>('http://192.168.0.16:3000/api/comments/'+id)
  }

  deleteComment(id): Observable<Comments>{
    return this.http
      .delete<Comments>('http://192.168.0.16:3000/api/comments/'+id)
  }

  postComment(comment): Observable<Comments> {
    return this.http.post<Comments>('http://192.168.0.78:3000/api/comments', comment)
  }

  putComment(comment, id): Observable<Comments>{
    return this.http.put<Comments>('http://192.168.0.78:3000/api/comments/'+id, comment)
  }
}
