import { Comments } from '../models/comments';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Global } from '../utils/global';

/*
  Generated class for the CommentsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentsServiceProvider {
  
  constructor(public http: HttpClient) {
  }

  getComments():Observable<Comments[]> {
    return this.http.get<Comments>(Global.SRV+Global.URL_API+'/comments').pipe(map(this.mapComments))
  }
  
  mapComments(res:any){
    return (res) ? res.map((comment)=>new Comments(comment)) : res.map((comment)=>new Comments(comment));
  }

  getComment(id): Observable<Comments>{
    return this.http
      .get<Comments>(Global.SRV+Global.URL_API+'/comments/'+id)
  }

  deleteComment(id): Observable<Comments>{
    return this.http
      .delete<Comments>(Global.SRV+Global.URL_API+'/comments/'+id)
  }

  postComment(comment): Observable<Comments> {
    return this.http.post<Comments>(Global.SRV+Global.URL_API+'/comments', comment)
  }

  putComment(comment, id): Observable<Comments>{
    return this.http.put<Comments>(Global.SRV+Global.URL_API+'/comments/'+id, comment)
  }
}
