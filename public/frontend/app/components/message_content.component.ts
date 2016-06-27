import { Component, OnInit } from '@angular/core'
import { RouteParams } from '@angular/router-deprecated';

import { MessageComponent } from './message.component'
import { EnterKeyDirective } from '../directives/enter_key.directive'
import { MessageService } from '../services/message.service'
import { UserService } from '../services/user.service'

declare  var $:any
declare  var currentUser:any

@Component({
  moduleId: module.id,
  selector: 'message-content',
  templateUrl: '../views/message_content.component.html',
  directives: [EnterKeyDirective, MessageComponent]
})

export class MessageContentComponent implements OnInit{
  constructor(
    private routeParams: RouteParams,
    private userService: UserService,
    private messageService: MessageService) {}

  messageString: string
  isDirectMessage: boolean = false
  user = {}
  self = this

  ngOnInit(){
    this.initDirectMessage()
  }

  sendMessage(){
    if(!this.messageString.trim()) return false

    if(this.isDirectMessage){
      App.global_chat.send_direct_message(this.messageString, this.user.id)
      this.messageString = null
    }else{
      //
    }
  }

  private initDirectMessage(){
    var username = this.routeParams.get('username')
    // is direct message
    if(username){
      this.isDirectMessage = true
      this.userService.getUserByUsername(username).then(response => {
        this.user = response.data
        this.initCableChatDirect()
      })
    }
  }

  private initCableChatDirect(){
    App.global_chat = App.cable.subscriptions.create({
      channel: "ChatChannel",
      direct_id: `${currentUser.id}_${this.user.id}`
    }, {
      received: this.displayMessage.bind(this),
      send_direct_message: function(content, receive_id) {
        return this.perform('send_direct_message', {
          content: content,
          receive_id: receive_id
        });
      }
    });
  }

  private displayMessage(data){
    this.user.messages.push(data.message)
  }

}
