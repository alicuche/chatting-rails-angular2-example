import { Component, OnInit, Input } from '@angular/core'
import { RouteParams } from '@angular/router-deprecated';

import { MessageService } from '../services/message.service'
import { UserService } from '../services/user.service'
import { CableService } from '../services/cable.service'

declare  var $:any
declare  var currentUser:any

@Component({
  moduleId: module.id,
  selector: 'message',
  templateUrl: '../views/message.component.html'
})

export class MessageComponent implements OnInit{
  @Input() message: any
  currentUser: any

  constructor(
    private userService: UserService,
    private cableService: CableService,
    private messageService: MessageService) {
      setTimeout(()=> $('#messages-content').scrollTop(100000000), 0)
    }

  ngOnInit(){
    this.currentUser = currentUser
  }

  editAction(){
    this.cableService.eventNext('editMessage', this.message)
  }

  removeAction(){
    this.cableService.eventEmit('removeMessage', this.message)
  }

}
