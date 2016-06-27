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

  // save(hero: Hero): Promise<Hero> {
  //   if (hero.id) {
  //     return this.put(hero);
  //   }
  //   return this.post(hero);
  // }

  // delete(hero: Hero) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http
  //     .delete(url, headers)
  //     .toPromise()
  //     .catch(this.handleError);
  // }
  // // Add new Hero
  // private post(hero: Hero): Promise<Hero> {
  //   let headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http
  //     .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
  //     .toPromise()
  //     .then(res => res.json().data)
  //     .catch(this.handleError);
  // }
  // // Update existing Hero
  // private put(hero: Hero) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(hero), { headers: headers })
  //     .toPromise()
  //     .then(() => hero)
  //     .catch(this.handleError);
  // }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}