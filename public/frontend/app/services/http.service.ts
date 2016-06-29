import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class HttpService {
  constructor(public http: Http) {}

  public get(url: string) {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  public post(url, data: any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(url, JSON.stringify(data), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}