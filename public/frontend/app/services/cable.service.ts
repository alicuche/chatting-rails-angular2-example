import { Injectable, EventEmitter } from '@angular/core';

declare  var App:any

@Injectable()
export class CableService {
  emitter: any = new EventEmitter();
  eventKeys: Array<any> = []

  constructor() {}

  newChannel(channel_id: string) {
    App.global_chat = App.cable.subscriptions.create({
      channel: "ChatChannel",
      channel_id: channel_id
    }, {
      received: this.receivedMessage.bind(this),
      send_direct_message: function(content, receive_id) {
        return this.perform('send_direct_message', {
          content: content,
          receive_id: receive_id
        });
      }
    });
  }

  sendDirectMessage(content: string, receive_id: number) {
    App.global_chat.send_direct_message(content, receive_id)
  }

  receivedMessage(data){
    this.eventNext('all', data)
  }

  eventNext(eventKey: string, data: any){
    data = {eventKey: eventKey, data: data}
    this.emitter.next(data)
  }

  eventEmit(eventKey: string, data: any){
    data = {eventKey: eventKey, data: data}
    this.emitter.emit(data)
  }

  subscribe(eventKey, callback){
    // if(this.eventKeys.indexOf(eventKey) != -1) return false
    // this.eventKeys.push(eventKey)

    return this.emitter.subscribe(content => {
      if(content.eventKey == eventKey){
        callback(content.data)
      }
    })
  }
}