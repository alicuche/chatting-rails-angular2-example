"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.get = function (url) {
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HttpService.prototype.post = function (url, data) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(url, JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
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
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map