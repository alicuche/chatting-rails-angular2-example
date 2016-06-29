import { Component, OnInit, Input, EventEmitter } from '@angular/core'
import { RouteParams } from '@angular/router-deprecated';

import { MessageComponent } from './message.component'
import { EnterKeyDirective } from '../directives/enter_key.directive'
import { MessageService } from '../services/message.service'
import { UserService } from '../services/user.service'
import { CableService } from '../services/cable.service'
import { NotifyService } from '../services/notify.service'

declare  var $:any
declare  var currentUser:any
declare  var subKeys:any

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
    private notifyService: NotifyService,
    private cableService: CableService,
    private messageService: MessageService) {}

  messageString: string
  isDirectMessage: boolean = false
  user: any = {}
  messages: any = []
  currentSubscribe = null

  ngOnInit(){
    this.initDirectMessage()
    this.currentSubscribe = this.cableService.subscribe('all', this.receivedMessage.bind(this))
  }

  ngOnDestroy(){
    this.currentSubscribe.unsubscribe()
  }

  sendMessage(){
    if(!this.messageString.trim()) return false

    if(this.isDirectMessage){
      this.cableService.sendDirectMessage(this.messageString, this.user['id'])
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
        this.messages = this.user.messages
      })
    }
  }

  private receivedMessage(data){
    var message = data.message
    switch(data.key){
      case subKeys.new_direct_message:


        if([message.receive_id, message.user_id].indexOf(this.user.id) != - 1){
          this.createNotify(message)
          this.displayMessage(message)
        }else if(message.user.id != currentUser.id){
          this.createNotify(message)
          this.cableService.eventNext('highlightDirectMessageFriend', message.user)
        }
    }
  }

  private createNotify(message){
    if(message.user.id != currentUser.id){
      this.notifyService.create({
        title: message.user.username,
        body: message.content,
        icon: message.user.avatar})
    }
  }

  private displayMessage(message){
    this.messages.push(message)
    setTimeout(()=> $('#messages-content').scrollTop(10000000), 10)
  }

}
