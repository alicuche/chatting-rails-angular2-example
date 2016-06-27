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

  ngOnInit(){
    this.initDirectMessage()
  }

  sendMessage(){
    if(!this.messageString.trim()) return false

    if(this.isDirectMessage){
      this.messageService.sendDirectMessage(this.user, this.messageString)
        .then(response => {
          this.user.messages.push(response.data)
          this.messageString = null
        })
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
      })
    }
  }

}
