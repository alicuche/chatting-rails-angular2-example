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
var cable_service_1 = require('../services/cable.service');
var notify_service_1 = require('../services/notify.service');
var search_pipe_1 = require('../pipes/search.pipe');
var MessageContentComponent = (function () {
    function MessageContentComponent(routeParams, userService, notifyService, cableService, messageService) {
        this.routeParams = routeParams;
        this.userService = userService;
        this.notifyService = notifyService;
        this.cableService = cableService;
        this.messageService = messageService;
        this.isDirectMessage = false;
        this.user = {};
        this.messages = [];
        this.currentSubscribe = null;
        this.searchString = '';
    }
    MessageContentComponent.prototype.ngOnInit = function () {
        this.initDirectMessage();
        this.currentSubscribe = this.cableService.subscribe('all', this.receivedMessage.bind(this));
        this.subcribeRemoveMessage = this.cableService.subscribe('removeMessage', this.removeMessageAndSend.bind(this));
    };
    MessageContentComponent.prototype.ngOnDestroy = function () {
        this.currentSubscribe.unsubscribe();
        this.subcribeRemoveMessage.unsubscribe();
    };
    MessageContentComponent.prototype.sendMessage = function () {
        if (!this.messageString.trim())
            return false;
        if (this.isDirectMessage) {
            this.cableService.sendDirectMessage(this.messageString, this.user['id']);
            this.messageString = null;
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
                _this.messages = _this.user.messages;
            });
        }
    };
    MessageContentComponent.prototype.receivedMessage = function (data) {
        var message = data.message;
        console.log(message);
        switch (data.key) {
            case subKeys.new_direct_message:
                if ([message.receive_id, message.user_id].indexOf(this.user.id) != -1) {
                    this.createNotify(message);
                    this.displayMessage(message);
                }
                else if (message.user.id != currentUser.id) {
                    this.createNotify(message);
                    this.cableService.eventNext('highlightDirectMessageFriend', message.user);
                }
                break;
            case subKeys.remove_message:
                this.removeMessage(message);
                break;
        }
    };
    MessageContentComponent.prototype.createNotify = function (message) {
        if (message.user.id != currentUser.id) {
            this.notifyService.create({
                title: message.user.username,
                body: message.content,
                icon: message.user.avatar });
        }
    };
    MessageContentComponent.prototype.displayMessage = function (message) {
        this.messages.push(message);
        setTimeout(function () { return $('#messages-content').scrollTop(10000000); }, 10);
    };
    MessageContentComponent.prototype.removeMessage = function (message) {
        var message = this.findMessage(message);
        if (message) {
            message.is_removed = true;
        }
    };
    MessageContentComponent.prototype.removeMessageAndSend = function (message) {
        this.removeMessage(message);
        this.cableService.removeDirectMessage(message);
    };
    MessageContentComponent.prototype.findMessage = function (message) {
        return this.messages.find(function (mes) { return mes.id == message.id; });
    };
    MessageContentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'message-content',
            templateUrl: '../views/message_content.component.html',
            directives: [enter_key_directive_1.EnterKeyDirective, message_component_1.MessageComponent],
            pipes: [search_pipe_1.SearchPipe]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, user_service_1.UserService, notify_service_1.NotifyService, cable_service_1.CableService, message_service_1.MessageService])
    ], MessageContentComponent);
    return MessageContentComponent;
}());
exports.MessageContentComponent = MessageContentComponent;
//# sourceMappingURL=message_content.component.js.map