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
var router_deprecated_1 = require('@angular/router-deprecated');
var routes_1 = require('../routes');
// components
var direct_messages_component_1 = require('./direct_messages.component');
// services
var http_service_1 = require('../services/http.service');
var user_service_1 = require('../services/user.service');
var message_service_1 = require('../services/message.service');
var cable_service_1 = require('../services/cable.service');
// directives
var enter_key_directive_1 = require('../directives/enter_key.directive');
var AppComponent = (function () {
    function AppComponent(cableService, userService) {
        this.cableService = cableService;
        this.userService = userService;
        this.currentUser = {};
    }
    AppComponent.prototype.ngOnInit = function () {
        this.currentUser = currentUser;
        this.cableService.newChannel(currentUser.id);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '#chat',
            templateUrl: '../views/layouts/application.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, direct_messages_component_1.DirectMessagesComponent, enter_key_directive_1.EnterKeyDirective],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                http_service_1.HttpService,
                user_service_1.UserService,
                message_service_1.MessageService,
                cable_service_1.CableService
            ]
        }),
        router_deprecated_1.RouteConfig(routes_1.APP_ROUTER_PROVIDERS), 
        __metadata('design:paramtypes', [cable_service_1.CableService, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map