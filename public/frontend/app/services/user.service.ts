import { Headers, Http } from '@angular/http';
import { Injectable }    from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service'

@Injectable()
export class UserService{
  constructor(
    private httpService: HttpService,
    private http: Http) {}

  getUserByUsername(username: string) {
    return this.httpService.get(`/users/username/${username}`)
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
