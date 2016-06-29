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
var CableService = (function () {
    function CableService() {
        this.emitter = new core_1.EventEmitter();
        this.eventKeys = [];
    }
    CableService.prototype.newChannel = function (channel_id) {
        App.global_chat = App.cable.subscriptions.create({
            channel: "ChatChannel",
            channel_id: channel_id
        }, {
            received: this.receivedMessage.bind(this),
            sendDirectMessage: function (content, receive_id) {
                return this.perform('send_direct_message', {
                    content: content,
                    receive_id: receive_id
                });
            },
            removeDirectMessage: function (message) {
                return this.perform('remove_message', {
                    message_id: message.id
                });
            }
        });
    };
    CableService.prototype.sendDirectMessage = function (content, receive_id) {
        App.global_chat.sendDirectMessage(content, receive_id);
    };
    CableService.prototype.removeDirectMessage = function (message) {
        App.global_chat.removeDirectMessage(message);
    };
    CableService.prototype.receivedMessage = function (data) {
        this.eventNext('all', data);
    };
    CableService.prototype.eventNext = function (eventKey, data) {
        data = { eventKey: eventKey, data: data };
        this.emitter.next(data);
    };
    CableService.prototype.eventEmit = function (eventKey, data) {
        data = { eventKey: eventKey, data: data };
        this.emitter.emit(data);
    };
    CableService.prototype.subscribe = function (eventKey, callback) {
        return this.emitter.subscribe(function (content) {
            if (content.eventKey == eventKey) {
                callback(content.data);
            }
        });
    };
    CableService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CableService);
    return CableService;
}());
exports.CableService = CableService;
//# sourceMappingURL=cable.service.js.map