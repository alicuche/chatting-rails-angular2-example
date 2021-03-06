"use strict";
var http_1 = require('@angular/http');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.get = function (url) {
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HttpService.prototype.post = function (url, data) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(url, JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
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
    HttpService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=base.service.js.map