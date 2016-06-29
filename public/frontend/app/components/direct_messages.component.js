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
var router_deprecated_2 = require('@angular/router-deprecated');
var enter_key_directive_1 = require('../directives/enter_key.directive');
var message_service_1 = require('../services/message.service');
var cable_service_1 = require('../services/cable.service');
var DirectMessagesComponent = (function () {
    function DirectMessagesComponent(router, cableService, messageService) {
        this.router = router;
        this.cableService = cableService;
        this.messageService = messageService;
        this.isShowAddFriend = false;
        this.friends = [];
    }
    DirectMessagesComponent.prototype.ngOnInit = function () {
        this.friends = currentUser.friends;
        this.cableService.subscribe('highlightDirectMessageFriend', this.highlightDirectMessageFriend.bind(this));
    };
    DirectMessagesComponent.prototype.highlightDirectMessageFriend = function (user) {
        console.log(this.friends);
        var friend = this.findFriend(user);
        if (!friend) {
            this.friends.unshift(user);
            friend = this.friends[0];
        }
        friend.isNewMessage = true;
    };
    DirectMessagesComponent.prototype.showAddFriend = function () {
        this.isShowAddFriend = true;
    };
    DirectMessagesComponent.prototype.hideAddFriend = function () {
        this.isShowAddFriend = false;
    };
    DirectMessagesComponent.prototype.startDirectMessage = function () {
        var _this = this;
        if (this.directMessageUserName) {
            this.messageService.addFriend(this.directMessageUserName)
                .then(function (response) {
                if (response.success) {
                    _this.friends.unshift(response.data);
                    _this.router.navigate(['DirectMessage', { username: _this.directMessageUserName }]);
                    _this.directMessageUserName = null;
                    _this.isShowAddFriend = false;
                }
            });
        }
    };
    DirectMessagesComponent.prototype.findFriend = function (friend) {
        return this.friends.find(function (u) { return u.id == friend.id; });
    };
    DirectMessagesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'direct-messages',
            templateUrl: '../views/direct_messages.component.html',
            directives: [enter_key_directive_1.EnterKeyDirective, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_deprecated_2.Router, cable_service_1.CableService, message_service_1.MessageService])
    ], DirectMessagesComponent);
    return DirectMessagesComponent;
}());
exports.DirectMessagesComponent = DirectMessagesComponent;
//# sourceMappingURL=direct_messages.component.js.map