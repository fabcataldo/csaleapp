import { Comments } from '../models/comments';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getComments(token) {
    return new Promise ( resolve => {
      this.http.get<Comments>('https://192.168.0.16:3000/api/comments', {
        headers: new HttpHeaders().set('Authorization', token)
      })
      .subscribe( data=>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    })
  }

  getComment(id, token){
    return new Promise(resolve => {
      this.http.get<Comments>('https://192.168.0.16:3000/api/comments/'+id, {
        headers: new HttpHeaders().set('Authorization', token)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  deleteComment(id, token){
    return new Promise(resolve => {
      this.http.delete('https://192.168.0.16:3000/api/comments/'+id, {
        headers: new HttpHeaders().set('Authorization', token)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  postComment(comment, token) {
    return new Promise(resolve => {
      this.http.post('https://192.168.0.16:3000/api/comments', JSON.stringify(comment), {
        headers: new HttpHeaders().set('Authorization', token)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  putComment(comment, id, token){
    return new Promise(resolve => {
      this.http.put<Comments>('https://192.168.0.16:3000/api/comments/'+id, comment, {
        headers: new HttpHeaders().set('Authorization', token)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }
}
