import { Component, OnInit } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Router }            from '@angular/router-deprecated';

import { EnterKeyDirective } from '../directives/enter_key.directive'
import { MessageService } from '../services/message.service'
import { CableService } from '../services/cable.service'

declare  var $:any
declare  var currentUser:any

@Component({
  moduleId: module.id,
  selector: 'direct-messages',
  templateUrl: '../views/direct_messages.component.html',
  directives: [EnterKeyDirective, ROUTER_DIRECTIVES]
})

export class DirectMessagesComponent implements OnInit{
  constructor(
    private router: Router,
    private cableService: CableService,
    private messageService: MessageService) {}

  isShowAddFriend: boolean = false
  directMessageUserName: string
  friends = []

  ngOnInit(){
    this.friends = currentUser.friends
    this.cableService.subscribe('highlightDirectMessageFriend', this.highlightDirectMessageFriend.bind(this))
  }

  highlightDirectMessageFriend(user){
    console.log(this.friends)
    let friend = this.findFriend(user)
    if(!friend){
      this.friends.unshift(user)
      friend = this.friends[0]
    }

    friend.isNewMessage = true
  }

  showAddFriend(){
    this.isShowAddFriend = true
  }

  hideAddFriend(){
    this.isShowAddFriend = false
  }

  startDirectMessage(){
    if(this.directMessageUserName){
      this.messageService.addFriend(this.directMessageUserName)
        .then(response => {
          if(response.success){
            this.friends.unshift(response.data)
            this.router.navigate(['DirectMessage', { username: this.directMessageUserName }]);
            this.directMessageUserName = null
            this.isShowAddFriend = false
          }
        })
    }
  }

  private findFriend(friend){
    return this.friends.find(u => u.id == friend.id)
  }

}
