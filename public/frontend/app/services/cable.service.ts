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
      sendDirectMessage: function(content, receive_id) {
        return this.perform('send_direct_message', {
          content: content,
          receive_id: receive_id
        });
      },
      removeDirectMessage: function(message){
        return this.perform('remove_message', {
          message_id: message.id
        })
      }
    });
  }

  sendDirectMessage(content: string, receive_id: number) {
    App.global_chat.sendDirectMessage(content, receive_id)
  }

  removeDirectMessage(message) {
    App.global_chat.removeDirectMessage(message)
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
    return this.emitter.subscribe(content => {
      if(content.eventKey == eventKey){
        callback(content.data)
      }
    })
  }
}