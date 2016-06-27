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
var message_component_1 = require('./message.component');
var enter_key_directive_1 = require('../directives/enter_key.directive');
var message_service_1 = require('../services/message.service');
var user_service_1 = require('../services/user.service');
var MessageContentComponent = (function () {
    function MessageContentComponent(routeParams, userService, messageService) {
        this.routeParams = routeParams;
        this.userService = userService;
        this.messageService = messageService;
        this.isDirectMessage = false;
        this.user = {};
    }
    MessageContentComponent.prototype.ngOnInit = function () {
        this.initDirectMessage();
    };
    MessageContentComponent.prototype.sendMessage = function () {
        var _this = this;
        if (!this.messageString.trim())
            return false;
        if (this.isDirectMessage) {
            this.messageService.sendDirectMessage(this.user, this.messageString)
                .then(function (response) {
                _this.user.messages.push(response.data);
                _this.messageString = null;
            });
        }
        else {
        }
    };
    MessageContentComponent.prototype.initDirectMessage = function () {
        var _this = this;
        var username = this.routeParams.get('username');
        // is direct message
        if (username) {
            this.isDirectMessage = true;
            this.userService.getUserByUsername(username).then(function (response) {
                _this.user = response.data;
            });
        }
    };
    MessageContentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'message-content',
            templateUrl: '../views/message_content.component.html',
            directives: [enter_key_directive_1.EnterKeyDirective, message_component_1.MessageComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, user_service_1.UserService, message_service_1.MessageService])
    ], MessageContentComponent);
    return MessageContentComponent;
}());
exports.MessageContentComponent = MessageContentComponent;
//# sourceMappingURL=message_content.component.js.map