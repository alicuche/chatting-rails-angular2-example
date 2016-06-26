import { Headers, Http } from '@angular/http';

import { Injectable }    from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { BaseService } from './base.service'

@Injectable()
export class UserService{
  private userUrl = '/users';  // URL to web api

  constructor(private http: Http) {}

  getCurrentUser() {
    return this.http.get('/users/current')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  getUser(id: number) {
    return this.http.get(`this.userUrl/${id}`)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
